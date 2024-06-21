import { Box, Paper, Typography } from '@mui/material';
import { gql } from '../../node_modules/graphql-tag/src/index';
import { useQuery } from '../../node_modules/@apollo/client/react/hooks/useQuery';
import { Link } from '@remix-run/react';

export default function BuchMitFilter({ art,schlagwort,rating }) {

    const FILTER_BOOKS = gql`
        query BUCH ($titel: String = "a") {
             buecher(suchkriterien: {titel: $titel}) {
                id
                art
                schlagwoerter
                titel {
                    titel
                }
        }
    }
    `;
    console.log(art, typeof art, schlagwort, typeof schlagwort, rating, typeof rating);
    const { loading, error, data } = useQuery(FILTER_BOOKS, {
        variables: { art, schlagwort, rating },
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;

    const path = "/" + data.buecher[0].id;
    return (
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            mt={4}
        >
            <Paper
                key={data.buecher[0].id}
                elevation={3}
                sx={{ padding: 2, minWidth: 200, textAlign: 'center' }}
            >
                <Link
                        to={path}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                    <Typography variant="subtitle1">
                        {data.buecher[0].schlagwoerter}
                    </Typography>
                    <Typography variant="h6">{data.buecher[0].titel.titel}</Typography>
                    <Typography variant="subtitle1">{data.buecher[0].isbn}</Typography>
                    <Typography variant="subtitle1">
                        {'UVP: ' + data.buecher[0].preis + ',-'}
                    </Typography>
                </Link>
            </Paper>
        </Box>
    );
}
