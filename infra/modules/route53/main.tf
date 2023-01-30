variable "zone_name" {
  type = string
}

resource "aws_route53_zone" "zone" {
  name = var.zone_name
}

output "zone_id" {
  value = aws_route53_zone.zone.id
}
