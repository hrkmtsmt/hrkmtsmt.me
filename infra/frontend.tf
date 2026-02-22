resource "cloudflare_worker" "frontend_worker" {
  account_id = var.cloudflare_account_id
  name       = "hrkmtsmt-frontend"
  observability = {
    enabled = true
  }
  subdomain = {
    enabled          = true
    previews_enabled = false
  }
}

locals {
  server_asset_files = fileset("../frontend/build/server/assets", "*.js")
}

resource "cloudflare_worker_version" "frontend_worker_version" {
  account_id          = var.cloudflare_account_id
  worker_id           = cloudflare_worker.frontend_worker.id
  main_module         = "index.js"
  compatibility_date  = "2025-04-04"
  compatibility_flags = ["nodejs_compat"]
  modules = concat(
    [{
      content_file = "../frontend/build/server/index.js"
      content_type = "application/javascript+module"
      name         = "index.js"
    }],
    [for f in local.server_asset_files : {
      content_file = "../frontend/build/server/assets/${f}"
      content_type = "application/javascript+module"
      name         = "assets/${f}"
    }]
  )
  assets = {
    directory = "../frontend/build/client"
  }
  bindings = [{
    name = "VALUE_FROM_CLOUDFLARE"
    type = "plain_text"
    text = "Hello from Cloudflare"
  }]
}

resource "cloudflare_workers_deployment" "frontend_worker_deployment" {
  account_id  = var.cloudflare_account_id
  script_name = cloudflare_worker.frontend_worker.name
  strategy    = "percentage"
  versions = [{
    percentage = 100
    version_id = cloudflare_worker_version.frontend_worker_version.id
  }]
}

resource "cloudflare_workers_route" "frontend_route" {
  zone_id = var.cloudflare_zone_id
  pattern = "${var.domain}/*"
  script  = cloudflare_worker.frontend_worker.name
}
