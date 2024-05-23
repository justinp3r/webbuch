import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3000/graphql'; // Ersetze dies durch deine GraphQL-Endpunkt-URL

export const graphqlClient = new GraphQLClient(endpoint, {
  credentials: 'include', // Erforderlich, wenn Authentifizierung benötigt wird
});