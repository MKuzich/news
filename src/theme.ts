import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    h2: {
      fontSize: 24,
      fontWeight: 400,
      lineHeight: 1.22,
      color: '#363636',
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#363636',
    },

    subtitle2: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.25,
      color: '#363636',
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#363636',
    },
    body2: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#363636',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  spacing: 1,
});
