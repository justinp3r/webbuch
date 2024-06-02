import { useQuery } from 'graphql-hooks';

const HOMEPAGE_QUERY = `query HomePage($id: String) {
  buch(id: $id) {
    isbn
    preis
  }
}`

export default function GraphHook() {
    const { loading, error, data } = useQuery(HOMEPAGE_QUERY, {
      variables: {
        id: "1"
      },
      mode: 'no-cors'
    })
    
    console.log("AKTUELLER STATUS GRAPHQL: loading-"+loading+"| error-"+error+"| data-"+data)
    if (loading) return 'Loading...'
    if (error) return 'Something Bad Happened'
    
  
    return (
      <ul>
        {data.users.map(({ isbn, preis }) => (
          <li key={isbn}>{preis}</li>
        ))}
      </ul>
    )
  }