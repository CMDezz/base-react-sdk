import { DEFAULT_THEME_CONFIG } from '@sdk/utils/config';
import { useEffect } from 'preact/hooks';

interface Props {
  context: SDKContext;
}

export function ThemeSync(props: Props) {
  useEffect(() => {
    const shadowRoot = props.context.shadowContainer; // ShadowRoot
    const host = shadowRoot?.host as HTMLElement | null;

    if (!host) return;

    const { colors } = DEFAULT_THEME_CONFIG;

    const colorMap: Record<string, string | undefined> = {
      '--color-primary': colors.primary,
      '--color-secondary': colors.secondary,
      '--color-success': colors.success,
      '--color-info': colors.info,
      '--color-warning': colors.warning,
      '--color-error': colors.danger,

      '--color-base-100': colors.background_primary,
      '--color-base-200': colors.background_secondary,
      '--color-base-content': colors.text_primary,
    };
    // console.log(colorMap);

    Object.entries(colorMap).forEach(([variable, value]) => {
      if (value) {
        host.style.setProperty(variable, value);
      }
    });
  }, []);

  return null;
}
