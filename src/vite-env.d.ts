/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KINDE_DOMAIN: string;
  readonly VITE_KINDE_CLIENT_ID: string;
  readonly VITE_KINDE_CLIENT_SECRET: string;
  readonly VITE_KINDE_REDIRECT_URI: string;
  readonly VITE_KINDE_LOGOUT_REDIRECT_URI: string;
  readonly VITE_KINDE_LOGOUT_REDIRECT_URI: string;
  readonly VITE_CONVEX_URL: string;
  readonly CONVEX_DEPLOYMENT: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
