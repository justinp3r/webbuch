import { gql, GraphQLClient } from 'graphql-request'

console.log("start");
const endpoint = `https://localhost:3000/graphql/`;

const graphQLClient = new GraphQLClient(endpoint, {
method: `GET`,
jsonSerializer: {
    parse: JSON.parse,
    stringify: JSON.stringify,
},
});

const query = gql`
query getBook($id: String!) {
    buch(id: $id) {
    isbn
    }
}
`

const variables = {
id: '1',
}

const daten = await graphQLClient.request(query, variables);
console.log(daten);