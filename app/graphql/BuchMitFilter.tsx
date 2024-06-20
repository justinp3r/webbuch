import { useState, useEffect, useMemo } from 'react';
import { gql } from '../../node_modules/graphql-tag/src/index';
import { Box, Paper, Typography, Link } from '@mui/material';
import { useQuery } from '../../node_modules/@apollo/client/react/hooks/useQuery';

type Schlagwort = 'JAVASCRIPT' | 'TYPESCRIPT';
type BuchArt = 'KINDLE' | 'DRUCKAUSGABE';

interface FilterVars {
    rating: number;
    art: BuchArt;
    schlagwoerter?: Schlagwort[];
}

export default function BuchMitFilter() {
    const [filterVars, setFilterVars] = useState<FilterVars>({
        rating: 2,
        art: "KINDLE",
        schlagwoerter: []
    });

    useEffect(() => {
        const checkWindow = typeof window !== 'undefined';
        const ratingStorage = Number(checkWindow && window.localStorage.getItem('rating'));
        const checkedJS = checkWindow && window.localStorage.getItem('checkedJS') === 'true';
        const checkedTS = checkWindow && window.localStorage.getItem('checkedTS') === 'true';
        const art = checkWindow && window.localStorage.getItem('checkedKindle') === 'true' ? "KINDLE" : "DRUCKAUSGABE";

        const newSchlagwoerter: Schlagwort[] = [];
        if (checkedJS) newSchlagwoerter.push("JAVASCRIPT");
        if (checkedTS) newSchlagwoerter.push("TYPESCRIPT");

        setFilterVars({
            rating: ratingStorage,
            art: art as BuchArt,
            schlagwoerter: newSchlagwoerter
        });
    }, []);

    const FILTER_BOOKS = gql`
    query FilteredBooks($rating: Int, $schlagwoerter: [String!], $art: BuchArt) {
        buecher(filter: {
            rating: $rating
            ${filterVars.schlagwoerter && filterVars.schlagwoerter.length > 0 ? 'schlagwoerter: $schlagwoerter' : ''}
            art: $art
        }) {
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

    const queryVariables = useMemo(() => {
        const variables: FilterVars = { ...filterVars };
        if (!variables.schlagwoerter || variables.schlagwoerter.length === 0) {
            delete variables.schlagwoerter;
        }
        return variables;
    }, [filterVars]);

    const { loading, error, data } = useQuery(FILTER_BOOKS, {
        variables: queryVariables,
        skip: !filterVars.rating && !filterVars.art
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
            key={data.buch.id}
            elevation={3}
            sx={{ padding: 2, minWidth: 200, textAlign: 'center' }}
        >
            <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                <Typography variant="h6">{data.buch.titel.titel}</Typography>
                <Typography variant="subtitle1">
                    {data.buch.schlagwoerter}
                </Typography>
                <Typography variant="subtitle1">{data.buch.isbn}</Typography>
                <Typography variant="subtitle1">
                    {'UVP: ' + data.buch.preis + ',-'}
                </Typography>
            </Link>
        </Paper>
    </Box>
    );
}
