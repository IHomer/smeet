locals {
  namespace        = join("-", ["smeet", terraform.workspace])
  parent_zone_name = "smeet.ihomer.academy"
}

module "deployment_bucket" {
  source    = "../modules/deployment-bucket"
  namespace = local.namespace
}

module "api_gateway" {
  source           = "../modules/api-gateway"
  namespace        = local.namespace
  parent_zone_name = local.parent_zone_name
}

module "frontend" {
  source           = "../modules/frontend"
  namespace        = local.namespace
  parent_zone_name = local.parent_zone_name
  api_gateway_url  = module.api_gateway.api_gateway_url
  service_name     = "smeet"
}

module "dynamodb" {
  source    = "../modules/dynamodb"
  namespace = local.namespace
}

module "eventbus" {
  source = "../modules/eventbridge"
  stage  = terraform.workspace
}
