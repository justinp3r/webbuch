import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import CheckboxSchlagwörter from "./routes/components/CheckboxSchlagwörter";
import React from "react";
import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@mui/material";
import CheckboxArt from "./routes/components/CheckboxArt";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <main id="content">
            <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1' }}>
              <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                  <Toolbar>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ flexGrow: 1 }}>
                        WEBBUCH
                      </Typography>
                    <Button variant="contained" color="secondary" disableElevation sx={{ marginRight: '15px' }}>Login</Button>
                    <Button variant="contained" color="secondary" disableElevation>Analyse</Button>
                  </Toolbar>
                </AppBar>
              </Box>
              <h1>Webbuch</h1>
            {children}
            </div>  
          </main>
        </React.Fragment>
      </ThemeProvider>
      <ScrollRestoration />
      <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}