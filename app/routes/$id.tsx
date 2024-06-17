import { ApolloClient } from '../../node_modules/@apollo/client/core/ApolloClient';
import { ApolloProvider } from '@apollo/client/react/context/ApolloProvider';
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';
import BuchKomplett from '../graphql/BuchKomplett.js';
import { useParams } from '@remix-run/react';

const client = new ApolloClient({
    uri: 'https://localhost:3000/graphql',
    cache: new InMemoryCache(),
});

export default function ShowSingleBook() {
    const { id } = useParams();

    return (
        <ApolloProvider client={client}>
            {id && <BuchKomplett id={id} />}
        </ApolloProvider>
    );
}
