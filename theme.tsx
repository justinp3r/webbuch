import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#614ecc',
    },
    secondary: {
      main: '#271375',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
