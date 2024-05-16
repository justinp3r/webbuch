import * as ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import App from './root';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';

const cache = createEmotionCache();

function Main() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline
            to build upon. */}
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.hydrateRoot(<Main />, document.querySelector('#root'));