import { Bindings } from "@types";

declare global {
  // biome-ignore lint/style/noNamespace: <explanation>
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: Bindings["ENVIRONMENT"];
      CLOUDFLARE_API_TOKEN: strintg;
      CLOUDFLARE_ACCOUNT_ID: string;
      CLOUDFLARE_DATABASE_ID: string;
      GITHUB_OWNER: string;
      GITHUB_REPO: string;
      GITHUB_TOKEN: string;
    }
  }
}
