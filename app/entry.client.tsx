/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
// import { RemixBrowser } from "@remix-run/react";
// import { startTransition, StrictMode } from "react";
// import { hydrateRoot } from "react-dom/client";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import App from './root';
import theme from '../theme';
import createEmotionCache from '../createEmotionCache';
import ReactDOM from "react-dom";

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


<ReactDOM className="hydrateRoot"></ReactDOM>(<Main />, document.querySelector('#root'))
// ReactDOM.hydrate(<Main />, document.querySelector('#root'));