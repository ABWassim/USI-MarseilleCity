output "alb_public_address" {
  value = aws_alb.external-endpoint.dns_name
}