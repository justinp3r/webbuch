import { Box, Paper, Typography } from '@mui/material';
import { gql } from '../../node_modules/graphql-tag/src/index';
import { useQuery } from '../../node_modules/@apollo/client/react/hooks/useQuery';
import { Link } from '@remix-run/react';
import BuchMitFilter2 from './BuchMitFilter2';

export default function BuchMitFilter() {

    const art =  (typeof window !== 'undefined' && window.localStorage.getItem('checkedKindle')) === "true" ? "KINDLE": "DRUCKAUSGABE";
    
    const FILTER_BOOKS_ART = gql`    
        query ($art: Art = KINDLE)  {
        buecher(suchkriterien: {art: $art}) {
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
    const { loading, error, data } = useQuery(FILTER_BOOKS_ART, {
        variables: { art },
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
