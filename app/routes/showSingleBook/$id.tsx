import {ApolloClient} from "../../../node_modules/@apollo/client/core/ApolloClient"; 
import {ApolloProvider} from "@apollo/client/react/context/ApolloProvider";
import {InMemoryCache} from "@apollo/client/cache/inmemory/inMemoryCache";
import BuchMitID from '../../graphql/BuchMitID';
import { useParams } from "@remix-run/react";

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export default function ShowSingleBook() {
  const { id } = useParams();

  console.log("ID aus URL:", id);
  
  return (
    <ApolloProvider client={client}>
      <p>Details zum Buch mit ID: {id}</p>
      {id && <BuchMitID id={id} />}
    </ApolloProvider>
  );
}