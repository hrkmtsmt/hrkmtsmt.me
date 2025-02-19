/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_BASIC_AUTH_USERNAME: string;
  readonly VITE_API_BASIC_AUTH_PASSWORD: string;
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
