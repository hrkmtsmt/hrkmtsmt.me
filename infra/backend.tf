resource "cloudflare_d1_database" "backend_db" {
  account_id = var.cloudflare_account_id
  name       = "hrkmtsmt-db"
  read_replication = {
    enabled = false
    mode    = "disabled"
  }
}

resource "cloudflare_worker" "backend_worker" {
  account_id = var.cloudflare_account_id
  name       = "hrkmtsmt-backend"
  observability = {
    enabled = true
  }
  subdomain = {
    enabled          = true
    previews_enabled = false
  }
}

resource "cloudflare_worker_version" "backend_worker_version" {
  account_id          = var.cloudflare_account_id
  worker_id           = cloudflare_worker.backend_worker.id
  main_module         = "main.js"
  compatibility_date  = "2024-11-11"
  compatibility_flags = ["nodejs_compat_populate_process_env"]
  modules = [{
    content_file = "../backend/dist/main.js"
    content_type = "application/javascript+module"
    name         = "main.js"
  }]
  bindings = [
    {
      name = "DB"
      type = "d1"
      id   = cloudflare_d1_database.backend_db.id
    }
  ]
}

resource "cloudflare_workers_deployment" "backend_worker_deployment" {
  account_id  = var.cloudflare_account_id
  script_name = cloudflare_worker.backend_worker.name
  strategy    = "percentage"
  versions = [{
    percentage = 100
    version_id = cloudflare_worker_version.backend_worker_version.id
  }]
}

resource "cloudflare_workers_cron_trigger" "backend_cron" {
  account_id  = var.cloudflare_account_id
  script_name = cloudflare_worker.backend_worker.name
  schedules   = [{ cron = "0 0 * * mon" }]
  depends_on  = [cloudflare_workers_deployment.backend_worker_deployment]
}

resource "cloudflare_workers_route" "backend_route" {
  zone_id    = var.cloudflare_zone_id
  pattern    = "${var.domain}/api/*"
  script     = cloudflare_worker.backend_worker.name
  depends_on = [cloudflare_workers_deployment.backend_worker_deployment]
}
