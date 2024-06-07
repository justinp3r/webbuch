import {ApolloClient} from "../../node_modules/@apollo/client/core/ApolloClient"; 
import {ApolloProvider} from "../../node_modules/@apollo/client/react/context/ApolloProvider";
import {InMemoryCache} from "../../node_modules/@apollo/client/cache/inmemory/inMemoryCache";
import {useQuery} from "../../node_modules/@apollo/client/react/hooks/useQuery";
import {gql} from "../../node_modules/graphql-tag/src/index";
import { Box, Paper, Typography } from '@mui/material';

export default function ApolloGraph(){

  const client = new ApolloClient({
    uri: 'https://localhost:3000/graphql',
    cache: new InMemoryCache(),
  });
  
  console.log("INDEDX")
  
  // TODO: Workaround für Zertifikate finden
  //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  
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
  
  const { loading, error, data } = useQuery(GET_BUECHER);
  console.log("| LOAD: "+loading+"| ERROR: "+error+"| DATA: "+data)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}