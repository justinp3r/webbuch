import type { MetaFunction } from '@remix-run/node';
import { Button, TextField} from '@mui/material';
import CheckboxSchlagwörter from './components/CheckboxSchlagwörter';
import CheckboxArt from './components/CheckboxArt';
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

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to our Semesterproject!" },
  ];
};

export default function Index() {

  return (
    <>
        <img src="../../public/open-book.png" height="100" width="100" alt="logo"></img>
        <p>Willkommen!</p>
        <TextField
          label="Suche..."
          id="outlined-size-small"
          size="small"
        />
        <Button variant="outlined" size="medium" sx={{ marginLeft: '15px', lineHeight:'2'}} >Suchen</Button>
        <h4>Buchart</h4>
        <CheckboxArt/>
        <h4>Schlagwörter</h4>
        <CheckboxSchlagwörter/>
        <ApolloProvider client={client}>
          <DisplayBuecher></DisplayBuecher>
        </ApolloProvider>
    </>
  );
} 