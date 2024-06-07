import type { MetaFunction } from '@remix-run/node';
import CheckboxSchlagwörter from './components/CheckboxSchlagwörter';
import CheckboxArt from './components/CheckboxArt';
import {ApolloClient} from "../../node_modules/@apollo/client/core/ApolloClient"; 
import {ApolloProvider} from "../../node_modules/@apollo/client/react/context/ApolloProvider";
import {InMemoryCache} from "../../node_modules/@apollo/client/cache/inmemory/inMemoryCache";
import {useQuery} from "../../node_modules/@apollo/client/react/hooks/useQuery";
import {gql} from "../../node_modules/graphql-tag/src/index";
import { Box, Paper, Typography } from '@mui/material';
import RatingStars from './components/RatingStars';

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

console.log("INDEDX")

// TODO: Workaround für Zertifikate finden
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

client
  .query({
    query: gql`
      query GetBuecher {
        buecher {
          id
          isbn
          preis
          schlagwoerter
          titel {
            titel
          }
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
      preis
      schlagwoerter
      titel {
        titel
      }
    }
  }
`;

function DisplayBuecher() {
  const { loading, error, data } = useQuery(GET_BUECHER);
  console.log("| LOAD: "+loading+"| ERROR: "+error+"| DATA: "+data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={4}>
      {data.buecher.map(({ id, isbn, titel, preis,schlagwoerter }) => (
        <Paper key={id} elevation={3} sx={{ padding: 2, minWidth: 200, textAlign: 'center' }}>
          <Typography variant="h6">{titel.titel}</Typography>
          <Typography variant="subtitle1">{schlagwoerter}</Typography>
          <Typography variant="subtitle1">{isbn}</Typography>
          <Typography variant="subtitle1">{"UVP: "+ preis+",-"}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
//------------------------------------------
const FILTER_BOOKS = gql`
  query BUCH($id: ID!) {
    buch(id: $id) {
      id
      isbn
      preis
      schlagwoerter
      titel {
        titel
      }
    }
  }
`;

function BuchMitID({ id }) {
  const { loading, error, data } = useQuery(FILTER_BOOKS, {
    variables: { id },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={4}>
        <Paper key={id} elevation={3} sx={{ padding: 2, minWidth: 200, textAlign: 'center' }}>
          <Typography variant="h6">{data.buch.titel.titel}</Typography>
          <Typography variant="subtitle1">{data.buch.schlagwoerter}</Typography>
          <Typography variant="subtitle1">{data.buch.isbn}</Typography>
          <Typography variant="subtitle1">{"UVP: "+ data.buch.preis+",-"}</Typography>
        </Paper>
    </Box>
  );
}
//------------------------------------------

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to our Semesterproject!" },
  ];
};

export default function Index() {
  return (
    <>
      <Box display="flex">
      <Box
        sx={{
          width: '250px',
          padding: '20px',
          borderRight: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <img src="../../public/open-book.png" height="100" width="100" alt="logo" />
        <p>Willkommen!</p>
        <h4>Buchart</h4>
        <CheckboxArt />
        <h4>Schlagwörter</h4>
        <CheckboxSchlagwörter />
        <h4>Bewertungen</h4>
        <RatingStars></RatingStars> 
      </Box>
      
      <Box sx={{ flexGrow: 1, padding: '20px' }}>
        <ApolloProvider client={client}>
          <DisplayBuecher />
          <BuchMitID id="1"></BuchMitID>
        </ApolloProvider>
      </Box>
    </Box>
    </>
  );
} 