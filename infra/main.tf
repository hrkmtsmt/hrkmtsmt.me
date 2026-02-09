terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5"
    }
  }

  backend "s3" {
    key                         = "terraform.tfstate"
    region                      = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    use_path_style              = true
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_dns_record" "root_cname" {
  zone_id = var.cloudflare_zone_id
  name    = "@"
  content = "hrkmtsmt.pages.dev"
  type    = "CNAME"
  proxied = true
  ttl     = 1
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

