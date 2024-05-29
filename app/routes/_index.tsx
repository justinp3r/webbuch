
import type { MetaFunction } from '@remix-run/node';
import { Button, TextField} from '@mui/material';
import CheckboxSchlagwörter from './components/CheckboxSchlagwörter';
import CheckboxArt from './components/CheckboxArt';
import { useState, useEffect } from 'react';
import { gql, GraphQLClient } from 'graphql-request';

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const fetchData = async () => {
  const endpoint = `http://localhost:3000/graphql/`;
  const graphQLClient = new GraphQLClient(endpoint, {
    method: `GET`,
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  })

  const query = gql`
    query getBook($id: String!) {
      buch(id: $id) {
        isbn
      }
    }
  `;

  const variables = { id: '1' };

  try {
    const data = await graphQLClient.request(query, variables);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default function Index() {
  
  const [graphqlResult, setGraphqlResult] = useState(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      const result = await fetchData();
      setGraphqlResult(result);
    }

    fetchDataWrapper();
  }, []);

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
        {graphqlResult && (
        <pre>{JSON.stringify(graphqlResult, null, 2)}</pre>
      )}
        
    </>
  );
} 