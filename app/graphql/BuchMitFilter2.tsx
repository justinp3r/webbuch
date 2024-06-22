import { Box, Paper, Typography } from '@mui/material';
import { gql } from '../../node_modules/graphql-tag/src/index';
import { useQuery } from '../../node_modules/@apollo/client/react/hooks/useQuery';
import { Link } from '@remix-run/react';

export default function BuchMitFilter2() {

    const schlagwoerter: string[] = []; 
    (typeof window !== 'undefined' && window.localStorage.getItem('checkedJS')) === "true" && schlagwoerter.push("JAVASCRIPT");
    (typeof window !== 'undefined' && window.localStorage.getItem('checkedTS')) === "true" && schlagwoerter.push("TYPESCRIPT");
    console.log("DAS sind die SCHLAAAGwoooeerter: " + schlagwoerter.length + (schlagwoerter.length > 0) && schlagwoerter[0] + " " + (schlagwoerter.length > 1) && schlagwoerter[1] );
    
    const FILTER_BOOKS_SCHLAG = gql`    
        query ($art: Art = KINDLE, $schlagwoerter: [String!])  {
        buecher(suchkriterien: {schlagwoerter: $schlagwoerter}) {
            id
            art
            isbn
            preis
            titel {
            titel
            }
        }
    }
    `;
    const { loading, error, data } = useQuery(FILTER_BOOKS_SCHLAG, {
        variables: { schlagwoerter },
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            mt={4}
        >
            {data.buecher.map(({ id, isbn, titel, preis, art }) => (
                <Paper
                    key={id}
                    elevation={3}
                    sx={{ padding: 2, minWidth: 200, textAlign: 'center' }}
                >
                    <Link
                        to={"/" + `${id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Typography variant="h6">{titel.titel}</Typography>
                        <Typography variant="subtitle1">{isbn}</Typography>
                        <Typography variant="subtitle1">
                            {art}
                        </Typography>
                        <Typography variant="subtitle1">
                            {'UVP: ' + preis + ',-'}
                        </Typography>
                    </Link>
                </Paper>
            ))}
        </Box>
    );
}
