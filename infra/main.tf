terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }

  backend "s3" {
    key = "terraform.tfstate"
    region = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check = true
    skip_region_validation = true
    skip_requesting_account_id = true
    use_path_style = true
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_worker" "frontend_worker" {
  account_id = var.cloudflare_account_id
  name = "hrkmtsmt"
  observability = {
    enabled = true
  }
  subdomain = {
    enabled = true
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
  account_id = var.cloudflare_account_id
  script_name = cloudflare_worker.frontend_worker.name
  strategy = "percentage"
  versions = [{
    percentage = 100
    version_id = cloudflare_worker_version.frontend_worker_version.id
  }]
}

resource "cloudflare_workers_custom_domain" "frontend_domain" {
  account_id = var.cloudflare_account_id
  hostname = var.domain
  service = "hrkmtsmt"
  zone_id = var.cloudflare_zone_id
}

resource "cloudflare_dns_record" "wildcard_a_1" {
  zone_id = var.cloudflare_zone_id
  name    = "*"
  content = "76.76.21.22"
  type    = "A"
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "wildcard_a_2" {
  zone_id = var.cloudflare_zone_id
  name    = "*"
  content = "76.76.21.9"
  type    = "A"
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "www_a_1" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  content = "76.76.21.61"
  type    = "A"
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "www_a_2" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  content = "76.76.21.22"
  type    = "A"
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "caa_letsencrypt" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  type    = "CAA"
  ttl     = 1
  data = {
    flags = "0"
    tag   = "issue"
    value = "letsencrypt.org"
  }
}

resource "cloudflare_dns_record" "dmarc" {
  zone_id = var.cloudflare_zone_id
  name    = "_dmarc"
  content = "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;"
  type    = "TXT"
  ttl     = 1
}

resource "cloudflare_dns_record" "dkim_wildcard" {
  zone_id = var.cloudflare_zone_id
  name    = "*._domainkey"
  content = "v=DKIM1; p="
  type    = "TXT"
  ttl     = 1
}

resource "cloudflare_dns_record" "spf" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  content = "v=spf1 -all"
  type    = "TXT"
  ttl     = 1
}

