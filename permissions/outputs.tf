output "blog_deploy_cloudflare_api_token" {
  value     = cloudflare_account_token.blog_deploy.value
  sensitive = true
}

output "blog_deploy_aws_access_key_id" {
  value = cloudflare_account_token.blog_deploy.id
}

output "blog_deploy_aws_secret_access_key" {
  value     = sha256(cloudflare_account_token.blog_deploy.value)
  sensitive = true
}

output "blog_deploy_permission_groups" {
  value = [
    for group in data.cloudflare_api_token_permission_groups_list.all.result : group
    if strcontains(lower(group.name), "r2")
  ]
}

output "blog_deploy_zone_permission_groups" {
  value = [
    for group in data.cloudflare_api_token_permission_groups_list.all.result : group
    if anytrue([
      for kw in ["zone", "dns", "ssl", "workers routes"] : strcontains(lower(group.name), kw)
    ])
  ]
}
