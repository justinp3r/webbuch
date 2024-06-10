import {useMutation} from "../../node_modules/@apollo/client/react/hooks/useMutation";

import {gql} from "../../node_modules/graphql-tag/src/index";

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

export default function SignInMutation() {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    try {
      const { data } = await login({ variables: { username, password } });
      console.log('JWT:', data.login.access_token);
      // Hier kannst du das JWT speichern (z.B. in einer React-Kontext oder im localStorage)
    } catch (error) {
      console.error('Login-Fehler:', error);
    }
  };
  return { handleSubmit };
}