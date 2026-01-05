interface ThemeColors {
  //common
  primary: string;
  secondary: string;
  success: string;
  info: string;
  warning: string;
  danger: string;

  //text
  text_primary: string;
  text_secondary: string;
  text_active: string;

  //border
  border_primary: string;
  border_secondary: string;
  border_active: string;

  //background
  background_primary: string;
  background_secondary: string;
  background_success: string;
  background_danger: string;
  background_warning: string;
  background_info: string;
}

interface ThemeConfig {
  colors: ThemeColors;
  //maybe fonts
  //spacing
  //-> private
}

interface CoreConfig {
  API_KEY: string;
  AUTH_TOKEN?: string;
  TARGET?:
    | 'BROWSER'
    | 'REACT'
    | 'VUE'
    | 'ANGULAR'
    | 'LARAVEL'
    | 'WORDPRESS'
    | 'NEXTJS';
  TARGET_VERSION?: string;
}

interface ModuleConfig {
  OCRAndLiveness: boolean;
  Liveness: boolean;
  FaceMatching: boolean;
}
interface SDKConfig {
  theme?: ThemeConfig;
  core: CoreConfig;
  module: ModuleConfig;
}
interface SDKContext {
  config: SDKConfig;
  shadowContainer: ShadowRoot | null;
  container: Element | null;
}

interface PreactRoot {
  render(children: preact.ComponentChild): void;
  unmount(): void;
}

interface WsResponse {
  session_id: string;
  status: string;
  current_step: string;
  completed_steps: string[];
  reconnected: boolean;
}

declare module '*.css?inline' {
  const content: string;
  export default content;
}
