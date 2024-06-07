// Anleitung: https://www.apollographql.com/docs/react/get-started
import {
  Link as RemixLink,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import React, { useState } from "react";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import SearchBarHeader from './routes/components/SearchBarHeader';
import SearchButtonHeader from './routes/components/SearchButtonHeader';

export function Layout({ children }: { children: React.ReactNode }) {
  const [searchText, setSearchText] = useState('');
  console.log("ROOT ausgeführt")
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
                        <a href="/"  color="primary.light" >
                        WEBBUCH
                        </a>
                      </Typography>
                      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                      <SearchBarHeader searchText={searchText} onSearchTextChange={setSearchText} />
                      <Link to="/SearchResults" color="secondary" component={RemixLink}>
                        <SearchButtonHeader searchText={searchText} />
                      </Link>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Link to="/LogIn" color="secondary" component={RemixLink}>
                        <Button variant="contained" color="secondary" disableElevation sx={{ marginRight: '15px' }}>Login</Button>
                        <Button variant="contained" color="secondary" disableElevation sx={{ marginRight: '15px' }}>Analyse</Button>
                        </Link>
                      </Box>
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