/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POCKETBASE_URL: string;
  readonly VITE_BACKEND_API_URL: string;
  readonly VITE_QR_CODE_WEB: string?;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
