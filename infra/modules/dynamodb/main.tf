variable "point_in_time_recovery" {
    default = false
}

variable "namespace" {
  type = string
}

resource "aws_dynamodb_table" "users_table" {
    billing_mode = "PAY_PER_REQUEST"
    name         = "${var.namespace}-users"
    hash_key     = "id"

    attribute {
        name = "id"
        type = "S"
    }

    point_in_time_recovery {
        enabled = var.point_in_time_recovery
    }
}

resource "aws_ssm_parameter" "dynamodb_users" {
    name        = "/serverless/${var.namespace}/dynamodb-users-datastore"
    description = "DynamoDB users datastore"
    type        = "SecureString"
    value       = aws_dynamodb_table.users_table.name
}

resource "aws_ssm_parameter" "dynamodb_users_arn" {
    name        = "/serverless/${var.namespace}/dynamodb-users-datastore-arn"
    description = "DynamoDB users datastore"
    type        = "SecureString"
    value       = aws_dynamodb_table.users_table.arn
}

resource "aws_dynamodb_table" "messages_table" {
    billing_mode = "PAY_PER_REQUEST"
    name         = "${var.namespace}-messages"
    hash_key     = "id"

    attribute {
        name = "id"
        type = "S"
    }

    point_in_time_recovery {
        enabled = var.point_in_time_recovery
    }
}

resource "aws_ssm_parameter" "dynamodb_messages" {
    name        = "/serverless/${var.namespace}/dynamodb-messages-datastore"
    description = "DynamoDB messages datastore"
    type        = "SecureString"
    value       = aws_dynamodb_table.messages_table.name
}

resource "aws_ssm_parameter" "dynamodb_messages_arn" {
    name        = "/serverless/${var.namespace}/dynamodb-messages-datastore-arn"
    description = "DynamoDB messages datastore"
    type        = "SecureString"
    value       = aws_dynamodb_table.messages_table.arn
}