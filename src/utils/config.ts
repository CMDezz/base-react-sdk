export const DEFAULT_CORE_CONFIG: CoreConfig = {
  API_KEY: '',
  AUTH_TOKEN: '',
  TARGET: 'REACT',
  TARGET_VERSION: '',
};

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  colors: {
    // common
    primary: '#1677ff', // main brand / actions
    secondary: '#13c2c2', // secondary accent
    success: '#52c41a', // success state
    info: '#1677ff', // info messages
    warning: '#faad14', // warning state
    danger: '#ff4d4f', // error / danger

    // text
    text_primary: '#1f1f1f', // main text
    text_secondary: '#595959', // muted text
    text_active: '#1677ff', // links / active text

    // border
    border_primary: '#d9d9d9', // default borders
    border_secondary: '#f0f0f0', // light dividers
    border_active: '#1677ff', // focused / active

    // background
    background_primary: '#ffffff', // main surface
    background_secondary: '#f5f5f5', // secondary surface
  } as ThemeColors,
};

export const DEFAULT_MODULE_CONFIG: ModuleConfig = {
  OCRAndLiveness: false,
  FaceMatching: false,
  Liveness: false,
} as ModuleConfig;

export const DEFAULT_SDK_CONFIG: SDKConfig = {
  core: DEFAULT_CORE_CONFIG,
  theme: DEFAULT_THEME_CONFIG,
  module: DEFAULT_MODULE_CONFIG,
};
