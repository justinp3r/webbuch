import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import {
    json,
    redirect,
    Link as RemixLink,
    useActionData,
    useLoaderData,
    useNavigate,
} from '@remix-run/react';
import { useMutation } from '../../node_modules/@apollo/client/react/hooks/useMutation';
import { gql } from '../../node_modules/graphql-tag/src/index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      Gruppe 6 /
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {

    const navigate = useNavigate();

    const LOGIN_MUTATION = gql`
        mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                access_token
                expires_in
                refresh_token
                refresh_expires_in
                roles
            }
        }
    `;

    const [login, { data: mutationData, loading, error }] = useMutation(
        LOGIN_MUTATION,
        {
            onError: (err) => {
                console.log('Anmeldung fehlgeschlagen! Grund: ' + err);
            },
            onCompleted: async (data) => {
                const jwtToken = data.login.access_token;
                console.log('Login erfolgreich! Token: ' + jwtToken);
                window.localStorage.setItem('authToken', jwtToken);
            },
        },
    );

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const username = data.get('email')?.toString() || '';
            const password = data.get('password')?.toString() || '';
            console.log({
                email: username,
                password: password,
            });
            const response = await login({ variables: { username, password } });
            if (response && response.data) {
              const jwtToken = response.data.login.access_token;
              console.log('Login erfolgreich! Token: ' + jwtToken);
              window.localStorage.setItem('authToken', jwtToken);
              navigate('/', { replace: true }); // Navigiere zur Hauptseite und lade die Seite neu
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Anmelden
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
