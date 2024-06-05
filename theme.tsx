import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#614ecc',
      light: '#FFFFFF',
    },
    secondary: {
      main: '#271375',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: '#28a745', // Example green color
    }
  },
});

export default theme;
