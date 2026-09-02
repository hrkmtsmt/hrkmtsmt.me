data "cloudflare_api_token_permission_groups_list" "all" {}

locals {
  permission_group_ids_by_name = {
    for group in data.cloudflare_api_token_permission_groups_list.all.result : group.name => group.id...
  }
  permission_group_ids = {
    for name, ids in local.permission_group_ids_by_name : name => ids[0]
  }

  deploy_permission_names = [
    "Workers Scripts Write",
    "Images Write",
    "Workers R2 Storage Write",
  ]
}

resource "cloudflare_account_token" "blog_deploy" {
  name       = "blog-deploy"
  account_id = var.cloudflare_account_id

  policies = [{
    effect = "allow"
    permission_groups = [
      for name in local.deploy_permission_names : { id = local.permission_group_ids[name] }
    ]
    resources = jsonencode({
      "com.cloudflare.api.account.${var.cloudflare_account_id}" = "*"
    })
  }]
}
