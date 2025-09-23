import { definePreset } from '@primeuix/styled';
import Nora from '@primeuix/themes/nora';

const PapsVideoclubPreset = definePreset(Nora, {
  semantic: {
    primary: {
      50: '#f2e8f7',
      100: '#e2cffa',
      200: '#c9a8e4',
      300: '#b48ccf',
      400: '#9b6dbd',
      500: '#68318e', // main branding purple
      600: '#562772',
      700: '#431d57',
      800: '#2e133c',
      900: '#1c0a26',
      950: '#0f0413',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#68318e',
          contrastColor: '#ffffff',
          hoverColor: '#7b3ca3',
          activeColor: '#572773',
        },
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#a07cac', // surface color for cards/nav
        },
        text: {
          color: '#1c1c1c', // main text
          hoverColor: '#333333', // secondary text
          mutedColor: '#6b6b6b', // muted text
        },
        highlight: {
          background: '#e3d6d7',
          focusBackground: '#a07cac',
          color: '#1c1c1c',
        },
      },
    },
  },
});

export default PapsVideoclubPreset;
