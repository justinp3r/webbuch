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
import React from "react";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import https from 'https';
import pkg from '@apollo/client';
const { gql, useQuery,ApolloClient, InMemoryCache, ApolloProvider } = pkg;

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql',
  cache: new InMemoryCache(),
  fetchOptions: {
    agent: new https.Agent({ rejectUnauthorized: false }),
  },
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

client
  .query({
    query: gql`
      query GetBuecher {
        buecher {
          id
          isbn
        }
      }
    `,
  })
  .then((result) => console.log(result.data.buecher));

const GET_BUECHER = gql`
  query GetBuecher {
    buecher {
      id
      isbn
    }
  }
`;

function DisplayBuecher() {
  const { loading, error, data } = useQuery(GET_BUECHER);
  console.log("| LOAD: "+loading+"| ERROR: "+error+"| DATA: "+data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  return data.buecher.map(({ id, isbn}) => (
    <div key={id}>
        <h3>{isbn}</h3>
      </div>
  ));
}

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
                        <Link to="/" color="primary.light" component={RemixLink}>
                        WEBBUCH
                        </Link>
                      </Typography>
                    <Link to="/LogIn" color="secondary" component={RemixLink}>
                      <Button variant="contained" color="secondary" disableElevation sx={{ marginRight: '15px' }}>Login</Button>
                    </Link>
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