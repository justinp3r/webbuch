import type { MetaFunction } from '@remix-run/node';
import { Button, TextField} from '@mui/material';
import CheckboxSchlagwörter from './components/CheckboxSchlagwörter';
import CheckboxArt from './components/CheckboxArt';
import SearchBar from './components/SearchBar';
import {ApolloClient} from "../../node_modules/@apollo/client/core/ApolloClient"; 
import {ApolloProvider} from "../../node_modules/@apollo/client/react/context/ApolloProvider";
import {InMemoryCache} from "../../node_modules/@apollo/client/cache/inmemory/inMemoryCache";
import {useQuery} from "../../node_modules/@apollo/client/react/hooks/useQuery";
import {gql} from "../../node_modules/graphql-tag/src/index";

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql',
  cache: new InMemoryCache(),
});


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
        <SearchBar/>
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