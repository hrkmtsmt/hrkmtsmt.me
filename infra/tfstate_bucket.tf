resource "cloudflare_r2_bucket" "blog-tfstate" {
  name          = "blog-tfstate"
  account_id    = var.cloudflare_account_id
  location      = "apac"
  storage_class = "Standard"
}
