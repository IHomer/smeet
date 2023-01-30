locals {
  namespace        = join("-", compact(["smeet", terraform.workspace != "default" ? terraform.workspace : ""]))
  parent_zone_name = "smeet.ihomer.academy"
}

module "deployment_bucket" {
  source    = "../modules/deployment-bucket"
  namespace = local.namespace
}

module "api_gateway" {
  source = "../modules/api-gateway"
  namespace = local.namespace
  parent_zone_name = local.parent_zone_name
}

module "frontend" {
  source           = "../modules/frontend"
  namespace        = local.namespace
  parent_zone_name = local.parent_zone_name
  service_name     = "smeet"
}