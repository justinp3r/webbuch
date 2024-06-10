import https from 'https';
import {
    gql,
    useQuery,
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';

export function ApolloGraph() {
    const client = new ApolloClient({
        uri: 'https://localhost:3000/graphql',
        cache: new InMemoryCache(),
        fetchOptions: {
            agent: new https.Agent({ rejectUnauthorized: false }),
        },
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

    const { loading, error, data } = useQuery(GET_BUECHER);

    console.log('| LOAD: ' + loading + '| ERROR: ' + error + '| DATA: ' + data);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error : {error.message}</p>;

    return data.buecher.map(({ id, isbn }) => (
        <>
            <ApolloProvider client={client}>
                <div key={id}>
                    <h3>{isbn}</h3>
                </div>
            </ApolloProvider>
        </>
    ));
}
