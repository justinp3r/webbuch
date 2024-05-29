import { gql, request, GraphQLClient } from 'graphql-request'

const endpoint = `https://localhost:3000/graphql/`

const graphQLClient = new GraphQLClient(endpoint, {
    method: `GET`,
    jsonSerializer: {
      parse: JSON.parse,
      stringify: JSON.stringify,
    },
  })
  
  const query = gql`
    query getMovie($id: String!) {
      buch(id: $id) {
        isbn
      }
    }
  `
  
  const variables = {
    id: `1`,
  }
  
  const data = await graphQLClient.request(query, variables)
  console.log(data)