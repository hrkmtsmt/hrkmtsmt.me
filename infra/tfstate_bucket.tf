resource "cloudflare_r2_bucket" "tfstate_bucket" {
  account_id = var.cloudflare_account_id
  name = "hrkmtsmt-tfstate"
  location = "apac"
  storage_class = "Standard"
}
