variable "stage" {
  type = string
}

resource "aws_cloudwatch_event_bus" "eventbus" {
  name = var.stage
}
