import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary1: {
      main: '#333333', 
    },
    secondary2: {
      main: '#E0E0E0', 
    },
  },
  typography: {
    fontFamily: '"Roboto", "Source Sans Pro", "Arial", sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: '24px',
        color: '#1a1a1a',
      },
    button: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        color: '#1a1a1a',
      },
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
      },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
  images: {
    StarIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ec1511b766fe935073d05a1de4df939d87c4657ec0a7def87da9850a68b5f01e?"
  }

});

export default theme;
