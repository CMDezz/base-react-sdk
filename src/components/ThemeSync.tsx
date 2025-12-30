import { DEFAULT_THEME_CONFIG } from '@sdk/utils/config';
import { useEffect } from 'preact/hooks';

export function ThemeSync() {
  useEffect(() => {
    const root = document.documentElement;
    const { colors } = DEFAULT_THEME_CONFIG;

    // Map JS keys to daisyUI / CSS variables
    const colorMap = {
      '--color-primary': colors.primary,
      '--color-secondary': colors.secondary,
      '--color-success': colors.success,
      '--color-info': colors.info,
      '--color-warning': colors.warning,
      '--color-error': colors.danger, // daisyUI uses 'error'
      
      '--color-base-100': colors.background_primary,
      '--color-base-200': colors.background_secondary,
      '--color-base-content': colors.text_primary,
    };

    // Apply each color to the :root element
    Object.entries(colorMap).forEach(([variable, value]) => {
      if (value) root.style.setProperty(variable, value);
    });
  }, []); // Re-run if config changes

  return null; 
}