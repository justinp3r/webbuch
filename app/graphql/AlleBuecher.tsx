import { useQuery } from '../../node_modules/@apollo/client/react/hooks/useQuery';
import { gql } from '../../node_modules/graphql-tag/src/index';
import { Box, Paper, Typography } from '@mui/material';
import { Link } from '@remix-run/react';

interface Buch {
    id: string; 
    isbn: string;
    titel: titel;
    preis: number;
    schlagwoerter: string[];
}

interface titel{
    titel: string;
}

export default function AlleBuecher() {
    const GET_BUECHER = gql`
        query GetBuecher {
            buecher {
                id
                isbn
                version
                rating
                art
                preis
                lieferbar
                datum
                homepage
                schlagwoerter
                titel {
                    titel
                }
            }
        }
    `;
    
    /* eslint-disable react-hooks/rules-of-hooks */
    const { loading, error, data } = useQuery(GET_BUECHER);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            mt={4}
        >
            {data.buecher.map(({ id, isbn, titel, preis, schlagwoerter }: Buch) => (
                <Paper
                    key={id}
                    elevation={3}
                    sx={{ padding: 2, minWidth: 200, textAlign: 'center' }}
                >
                    <Link
                        to={`${id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Typography variant="h6">{titel.titel}</Typography>
                        <Typography variant="subtitle1">
                            {schlagwoerter}
                        </Typography>
                        <Typography variant="subtitle1">{isbn}</Typography>
                        <Typography variant="subtitle1">
                            {'UVP: ' + preis + ',-'}
                        </Typography>
                    </Link>
                </Paper>
            ))}
        </Box>
    );
}
