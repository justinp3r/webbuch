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
import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import SearchBarHeader from './routes/components/SearchBarHeader';
import SearchButtonHeader from './routes/components/SearchButtonHeader';
import { ApolloClient } from '../node_modules/@apollo/client/core/ApolloClient';
import { ApolloProvider } from '../node_modules/@apollo/client/react/context/ApolloProvider';
import { InMemoryCache } from '../node_modules/@apollo/client/cache/inmemory/inMemoryCache';
import { useNavigate } from '@remix-run/react';
import { isConstValueNode } from 'graphql';

const client = new ApolloClient({
    uri: 'https://localhost:3000/graphql',
    cache: new InMemoryCache(),
});
function logStatusAuth() {
    console.log(
        'Login Active Token: ' +
            (typeof window !== 'undefined' &&
                window.localStorage.getItem('authToken')),
    );
}

export function Layout({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();

    let isLoggedIn =
        typeof window !== 'undefined' &&
        window.localStorage.getItem('authToken');

    const [isClicked, setIsClicked] = useState(isLoggedIn ? true : false);

    const [searchText, setSearchText] = useState('');

    let angemeldetBool= isLoggedIn?true:false;

    useEffect(() => {
        // Seite neu laden, wenn isClicked sich ändert
        navigate('.', { replace: true });
      }, [isClicked, navigate]);

    const handleLogout = () => {
        window.localStorage.removeItem('authToken');
        isLoggedIn=false;
        setIsClicked(false);
        console.log('Du wirst ausgeloggt...');
        navigate('/');
    };

    const handleLogin = () => {
        navigate('/LogIn');
    };

    const handleHinzufuegen = () => {
        navigate('/CreateBook');
    };

    logStatusAuth();

    return (
        <html lang="en">
            <ApolloProvider client={client}>
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
                                                    <a
                                                        href="/"
                                                        color="primary.light"
                                                    >
                                                        WEBBUCH
                                                    </a>
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        flexGrow: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <SearchBarHeader
                                                        searchText={searchText}
                                                        onSearchTextChange={
                                                            setSearchText
                                                        }
                                                    />
                                                    <Link
                                                        to="/SearchResults"
                                                        color="secondary"
                                                        component={RemixLink}
                                                    >
                                                        <SearchButtonHeader
                                                            searchText={
                                                                searchText
                                                            }
                                                        />
                                                    </Link>
                                                </Box>
                                                <Box sx={{ display: 'flex' }}>
                                                    <Button
                                                        variant="contained"
                                                        color={"secondary"}
                                                        disabled={false}
                                                        onClick={handleLogout}
                                                        sx={{
                                                            marginRight: '15px',
                                                        }}
                                                    >
                                                        Logout
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        disabled={false}
                                                        onClick={handleLogin}
                                                        sx={{
                                                            marginRight: '15px',
                                                        }}
                                                    >
                                                        Login
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        disabled={false} // Button ist deaktiviert, wenn !isClicked (false)
                                                        onClick={angemeldetBool ? handleHinzufuegen : handleLogin} // Führt handleHinzufuegen aus, wenn isClicked true ist, sonst handleLogin
                                                        sx={{
                                                            marginRight: '15px',
                                                        }}
                                                        >
                                                        + hinzufügen
                                                    </Button>
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
            </ApolloProvider>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
