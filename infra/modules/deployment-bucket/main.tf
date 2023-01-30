variable "namespace" {
}

resource "aws_s3_bucket" "serverless_deployment_bucket" {
  bucket = "${var.namespace}-sls-deployment"
  cors_rule {
    allowed_methods = [
      "PUT",
      "POST",
      "GET",
    "DELETE"]
    allowed_origins = [
    "*"]
    allowed_headers = [
    "*"]
    max_age_seconds = 3000
  }

  versioning {
    enabled = true
  }
}

resource "aws_ssm_parameter" "serverless_deployment_bucket" {
  name        = "/serverless/${var.namespace}/deployment-bucket"
  description = "S3 serverless deployment"
  type        = "SecureString"
  value       = aws_s3_bucket.serverless_deployment_bucket.bucket
}
