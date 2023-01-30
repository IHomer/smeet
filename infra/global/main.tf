module "terraform_state_backend" {
  source        = "cloudposse/tfstate-backend/aws"
  version       = "0.38.1"
  namespace     = "smeet"
  stage         = "global"
  name          = "terraform"
  attributes    = ["state"]
  force_destroy = false
}

module "route53" {
  source    = "../modules/route53"
  zone_name = "smeet.ihomer.academy"
}
