terraform {
  required_version = ">= 0.12.2"

  backend "s3" {
    region         = "eu-central-1"
    bucket         = "smeet-global-terraform-state"
    key            = "terraform.tfstate"
    dynamodb_table = "smeet-global-terraform-state-lock"
    encrypt        = "true"
  }
}
