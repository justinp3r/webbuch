// Anleitung: https://www.apollographql.com/docs/react/get-started
import {
    Link as RemixLink,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react';

import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import React from 'react';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

export function Layout({ children }: { children: React.ReactNode }) {
    console.log('ROOT ausgeführt');
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <ThemeProvider theme={theme}>
                    <React.Fragment>
                        <main id="content">
                            <div
                                style={{
                                    fontFamily: 'system-ui, sans-serif',
                                    lineHeight: '1',
                                }}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <AppBar position="fixed">
                                        <Toolbar>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{ flexGrow: 1 }}
                                            >
                                                <Link
                                                    to="/"
                                                    color="primary.light"
                                                    component={RemixLink}
                                                >
                                                    WEBBUCH
                                                </Link>
                                            </Typography>
                                            <Link
                                                to="/LogIn"
                                                color="secondary"
                                                component={RemixLink}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    disableElevation
                                                    sx={{ marginRight: '15px' }}
                                                >
                                                    Login
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                disableElevation
                                            >
                                                Analyse
                                            </Button>
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
