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

locals {
  domain_name = "${terraform.workspace != "default" ? "${terraform.workspace}." : ""}${var.parent_zone_name}"
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
  source  = "cloudposse/cloudfront-s3-cdn/aws"
  version = "0.86.0"

  namespace         = var.namespace
  stage             = ""
  name              = var.service_name
  aliases           = [local.domain_name]
  dns_alias_enabled = true
  parent_zone_id    = data.aws_route53_zone.zone.id

  acm_certificate_arn = module.acm_request_certificate.arn

  depends_on = [module.acm_request_certificate]
}
