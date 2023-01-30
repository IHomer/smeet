variable "namespace" {
  type = string
}

variable "parent_zone_name" {
  type = string
}

locals {
  domain_name = "${terraform.workspace != "default" ? "${terraform.workspace}." : ""}${var.parent_zone_name}"
  api_domain_name = "api.${local.domain_name}"
}

data "aws_route53_zone" "zone" {
  name = var.parent_zone_name
}

resource "aws_route53_record" "api_gateway_record" {
  name    = local.api_domain_name
  type    = "CNAME"
  zone_id = data.aws_route53_zone.zone.id
  ttl     = 300
  records = [
    aws_api_gateway_domain_name.api.regional_domain_name
  ]
}

module "acm_request_certificate" {
  source  = "cloudposse/acm-request-certificate/aws"
  version = "0.17.0"

  domain_name                       = local.api_domain_name
  zone_id                           = data.aws_route53_zone.zone.id
  process_domain_validation_options = true
  ttl                               = "300"
}

resource "aws_api_gateway_domain_name" "api" {
  regional_certificate_arn = module.acm_request_certificate.arn
  domain_name              = local.api_domain_name
  endpoint_configuration {
    types = [
      "REGIONAL"
    ]
  }
}

resource "aws_api_gateway_rest_api" "api" {
  name        = "${var.namespace}-gateway"
  description = "api gateway for ${var.namespace}-${terraform.workspace}"
}

resource "aws_api_gateway_gateway_response" "response-validation-error" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  response_type = "BAD_REQUEST_BODY"
  status_code   = "400"
  response_templates = {
    "application/json" = "{\"message\":\"$context.error.validationErrorString\"}"
  }
}

resource "aws_api_gateway_resource" "dummy" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "dummy"
}

resource "aws_api_gateway_method" "dummy" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.dummy.id
  http_method   = "GET"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "dummy" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.dummy.id
  http_method = aws_api_gateway_method.dummy.http_method
  type        = "MOCK"
}

resource "aws_api_gateway_method_response" "dummy" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  resource_id = aws_api_gateway_resource.dummy.id
  http_method = aws_api_gateway_method.dummy.http_method
  status_code = "200"
}

resource "aws_api_gateway_deployment" "api_deployment_api" {
  depends_on = [
    aws_api_gateway_integration.dummy
  ]
  
  rest_api_id       = aws_api_gateway_rest_api.api.id
  stage_name        = terraform.workspace
  stage_description = ""
  variables = {
    xray_tracing_enabled = true
  }
}

resource "aws_api_gateway_base_path_mapping" "api" {
  api_id      = aws_api_gateway_rest_api.api.id
  stage_name  = aws_api_gateway_deployment.api_deployment_api.stage_name
  domain_name = aws_api_gateway_domain_name.api.domain_name
}

resource "aws_ssm_parameter" "rest_api_domain" {
  name        = "/serverless/${var.namespace}/rest-api-domain"
  description = "Api Gateway Domain"
  type        = "SecureString"
  value       = local.api_domain_name
}

resource "aws_ssm_parameter" "rest_api_id" {
  name        = "/serverless/${var.namespace}/rest-api-id"
  description = "Api Gateway Id needed for deployment"
  type        = "SecureString"
  value       = aws_api_gateway_rest_api.api.id
}

resource "aws_ssm_parameter" "rest_api_root_resource_id" {
  name        = "/serverless/${var.namespace}/rest-api-root-resource-id"
  description = "Api Gateway Id needed for deployment"
  type        = "SecureString"
  value       = aws_api_gateway_rest_api.api.root_resource_id
}