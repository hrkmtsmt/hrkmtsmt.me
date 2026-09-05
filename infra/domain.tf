locals {
  blog_zone_name = "hrkmtsmt.me"

  blog_worker_service = "app"

  blog_worker_hostnames = [
    local.blog_zone_name,
    "www.${local.blog_zone_name}",
    "blog.${local.blog_zone_name}",
  ]
}

resource "cloudflare_zone" "blog" {
  account = {
    id = var.cloudflare_account_id
  }
  name = local.blog_zone_name
  type = "full"
}

resource "cloudflare_workers_custom_domain" "blog" {
  for_each = toset(local.blog_worker_hostnames)

  account_id = var.cloudflare_account_id
  hostname   = each.value
  service    = local.blog_worker_service
  zone_id    = cloudflare_zone.blog.id
  zone_name  = cloudflare_zone.blog.name
}

output "blog_zone_name_servers" {
  value       = cloudflare_zone.blog.name_servers
}

output "blog_zone_status" {
  value       = cloudflare_zone.blog.status
}
