import { Box, Paper, Typography } from "@mui/material";
import {gql} from "../../node_modules/graphql-tag/src/index";
import {useQuery} from "../../node_modules/@apollo/client/react/hooks/useQuery";

export default function BuchMitID({id}){
    if (id===null){
        return id;
    }
    const FILTER_BOOKS = gql`
    query BUCH($id: ID!) {
      buch(id: $id) {
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
  
    const { loading, error, data } = useQuery(FILTER_BOOKS, {
      variables: { id },
    });
  
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mt={4}>
          <Paper key={id} elevation={3} sx={{ padding: 2, minWidth: 200, textAlign: 'center' }}>
            <Typography variant="h6">{data.buch.titel.titel}</Typography>
            <Typography variant="subtitle1">{data.buch.schlagwoerter}</Typography>
            <Typography variant="subtitle1">{data.buch.isbn}</Typography>
            <Typography variant="subtitle1">{"UVP: "+ data.buch.preis+",-"}</Typography>
          </Paper>
      </Box>
    );

}