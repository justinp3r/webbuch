import { Box, Paper, Typography } from '@mui/material';
import { gql } from '../../node_modules/graphql-tag/src/index';
import { useQuery } from '../../node_modules/@apollo/client/react/hooks/useQuery';
import { Link } from '@remix-run/react';
import { useMutation } from '@apollo/client';

export default function BuchMitFilter() {
const rating = window.localStorage.getItem('rating');
const schlagworte = [window.localStorage.getItem('checkedJS'), window.localStorage.getItem('checkedTS')];
const art = window.localStorage.getItem('checkedKindle') === 'true' ? "KINDLE" : "DRUCKAUSGABE";

const FILTER_BOOKS = gql`
query BUCH($rating: number!,$schlagworte: string[], $art: string) {
    buch(rating: $rating, schlagwoerter: $schlagworte art: $art) {
        id
        isbn
        preis
        rating
        schlagwoerter
        art
        titel {
            titel
        }
    }
}
`;

const { loading, error, data } = useQuery(FILTER_BOOKS, {
variables: { rating, schlagworte, art},
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
            <Paper
                key={id}
                elevation={3}
                sx={{ padding: 2, minWidth: 200, textAlign: 'center' }}
            >
                <Typography variant="h6">{data.buch.titel.titel}</Typography>
                <Typography variant="subtitle1">
                    {data.buch.schlagwoerter}
                </Typography>
                <Typography variant="subtitle1">{data.buch.isbn}</Typography>
                <Typography variant="subtitle1">
                    {'UVP: ' + data.buch.preis + ',-'}
                </Typography>
            </Paper>
        </Box>
    );
}
