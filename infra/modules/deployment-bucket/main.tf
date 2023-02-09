variable "namespace" {
}

resource "aws_s3_bucket" "serverless_deployment_bucket" {
  bucket = "${var.namespace}-sls-deployment"
}

resource "aws_s3_bucket_cors_configuration" "bucket_cors_configuration" {
  bucket = aws_s3_bucket.serverless_deployment_bucket.id

  cors_rule {
    allowed_methods = [
      "PUT",
      "POST",
      "GET",
      "DELETE"
    ]
    allowed_origins = ["*"]
    allowed_headers = ["*"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_versioning" "bucket_versioning" {
  bucket = aws_s3_bucket.serverless_deployment_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_ssm_parameter" "serverless_deployment_bucket" {
  name        = "/serverless/${var.namespace}/deployment-bucket"
  description = "S3 serverless deployment"
  type        = "SecureString"
  value       = aws_s3_bucket.serverless_deployment_bucket.bucket
}
