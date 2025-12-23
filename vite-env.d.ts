interface ImportMetaEnv {
  readonly MODE: string;
  readonly DEV: boolean;
  readonly VITE_SDK_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
