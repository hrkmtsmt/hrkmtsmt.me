import { Bindings } from "@types";

declare global {
  // biome-ignore lint/style/noNamespace: NodeJS namespace is required for environment type declarations
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: Bindings["ENVIRONMENT"];
      CLOUDFLARE_API_TOKEN: string;
      CLOUDFLARE_ACCOUNT_ID: string;
      CLOUDFLARE_DATABASE_ID: string;
      GITHUB_OWNER: string;
      GITHUB_REPO: string;
      GITHUB_TOKEN: string;
    }
  }
}
