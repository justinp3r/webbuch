import React from 'react';
import { useMutation } from '../../node_modules/@apollo/client/react/hooks/useMutation';
import { gql } from '../../node_modules/graphql-tag/src/index';

export default function SignInMutation() {
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
    
    const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION, {
        variables: {
            username: 'admin',
            password: 'p',
        },
        onCompleted: (data) => {
            console.log('JWT:', data.login.access_token);
            // Hier kannst du das JWT speichern (z.B. in einer React-Kontext oder im localStorage)
        },
    });

    React.useEffect(() => {
        login();
    }, [login]);

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return <p>{data.login.access_token}</p>;
}
