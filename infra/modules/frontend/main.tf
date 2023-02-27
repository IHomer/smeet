provider "aws" {
  region = "us-east-1"
  alias  = "us-east-1"
}

variable "namespace" {
  type = string
}

variable "service_name" {
  type = string
}

variable "parent_zone_name" {
  type = string
}

variable "api_gateway_url" {
  type = string
}

locals {
  domain_name = "${terraform.workspace != "prod" ? "${terraform.workspace}." : ""}${var.parent_zone_name}"
}

data "aws_route53_zone" "zone" {
  name = var.parent_zone_name
}

module "acm_request_certificate" {
  source  = "cloudposse/acm-request-certificate/aws"
  version = "0.17.0"
  providers = {
    aws = aws.us-east-1
  }

  domain_name                       = local.domain_name
  zone_id                           = data.aws_route53_zone.zone.id
  process_domain_validation_options = true
  ttl                               = "300"
}

module "cdn" {
  depends_on = [module.acm_request_certificate]

  source  = "cloudposse/cloudfront-s3-cdn/aws"
  version = "0.86.0"

  namespace         = var.namespace
  stage             = ""
  name              = var.service_name
  aliases           = [local.domain_name]
  dns_alias_enabled = true
  parent_zone_id    = data.aws_route53_zone.zone.id

  acm_certificate_arn = module.acm_request_certificate.arn

  custom_origins = [
    {
      domain_name    = var.api_gateway_url
      origin_id      = "apigw"
      origin_path    = ""
      custom_headers = []
      custom_origin_config = {
        http_port                = 80
        https_port               = 443
        origin_protocol_policy   = "https-only"
        origin_ssl_protocols     = ["TLSv1.2"]
        origin_keepalive_timeout = 30
        origin_read_timeout      = 60
      }
    }
  ]

  ordered_cache = [
    {
      target_origin_id = "apigw"
      path_pattern     = "/api/*"

      allowed_methods = [
        "DELETE",
        "GET",
        "HEAD",
        "OPTIONS",
        "PATCH",
        "POST",
        "PUT"
      ]
      cached_methods = [
        "HEAD",
        "GET",
        "OPTIONS"
      ]
      cache_policy_id          = null
      origin_request_policy_id = null
      compress                 = false

      viewer_protocol_policy     = "redirect-to-https"
      min_ttl                    = 0
      default_ttl                = 0
      max_ttl                    = 0
      response_headers_policy_id = ""

      forward_query_string = true
      forward_header_values = [
        "Authorization"
      ]
      forward_cookies                   = "all"
      forward_cookies_whitelisted_names = []

      trusted_key_groups = []
      trusted_signers    = []

      function_association        = []
      lambda_function_association = []
    }
  ]

  custom_error_response = [
    {
      error_caching_min_ttl = 300
      error_code            = 404
      response_code         = 200
      response_page_path    = "/index.html"
    }
  ]
}
