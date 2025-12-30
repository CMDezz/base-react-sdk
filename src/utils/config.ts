export const DEFAULT_CORE_CONFIG: CoreConfig = {
  API_KEY: '',
  AUTH_TOKEN: '',
  TARGET: 'REACT',
  TARGET_VERSION: '',
};

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  colors: {
    // common
    primary: '#16a34a', // main brand / actions
    secondary: '#595959', // secondary accent
    success: '#16a34a', // success state
    info: '#2563eb', // info messages
    warning: '#ca8a04', // warning state
    danger: '#dc2626', // error / danger

    // background
    background_primary: '#ffffff', // main surface
    background_secondary: '#f9fafb', // secondary surface
    background_success: '#dcfce7',
    background_info: '#dbeafe',
    background_warning: '#fef9c3',
    background_danger: '#fee2e2',
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
