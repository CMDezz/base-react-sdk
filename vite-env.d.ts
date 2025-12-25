interface ImportMetaEnv {
  readonly MODE: string;
  readonly DEV: boolean;
  readonly VITE_SDK_URI: string;
  readonly VITE_SOCKET_URI: string;
  readonly VITE_API_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
