import { Box, Paper, Typography } from '@mui/material';
import { gql } from '../../node_modules/graphql-tag/src/index';
import { useQuery } from '../../node_modules/@apollo/client/react/hooks/useQuery';
import { Link } from '@remix-run/react';
import { useMemo } from 'react';

// das ein kommentar
interface Book {
    id: string;
    [key: string]: any;  
  }
  const removeDuplicates = <T extends Book>(books: T[]): T[] => {
    const uniqueBooks = new Map<string, T>();
    books.forEach(book => {
      if (!uniqueBooks.has(book.id)) {
        uniqueBooks.set(book.id, book);
      }
    });
    return Array.from(uniqueBooks.values());
  };

export default function BuchMitFilter() {
    const lieferbar = (typeof window !== 'undefined' && window.localStorage.getItem('checkedLieferbar')) === "true" ? true: false;
    const ignorieren = (typeof window !== 'undefined' && window.localStorage.getItem('checkedIgnorieren')) === "true" ? true: false;
    const art =  (typeof window !== 'undefined' && window.localStorage.getItem('checkedKindle')) === "true" ? "KINDLE": (typeof window !== 'undefined' && window.localStorage.getItem('checkedDruck') === "true")?"DRUCKAUSGABE" :null;
    let rating: number = Number((typeof window !== 'undefined' && window.localStorage.getItem('rating')));
    rating = isNaN(rating)? 10: rating;
    console.log("rating: " + rating + " art: " + art);
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
    const { loading: loadingArt, error: errorArt, data: dataArt } = useQuery(FILTER_BOOKS_ART, {
        variables: { art },
        skip: art === null,
    });

    const FILTER_BOOKS_RATING = gql`    
        query ($rating: Int = 2)  {
            buecher(suchkriterien: {rating: $rating}) {
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
    const { loading: loadingRating, error: errorRating, data: dataRating } = useQuery(FILTER_BOOKS_RATING, {
        variables: { rating },
        skip: rating === 10,
    });

    const FILTER_BOOKS_LIEFERBAR = gql`    
        query ($lieferbar: Boolean = true)  {
            buecher(suchkriterien: {lieferbar: $lieferbar}) {
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
    const { loading: loadingLieferbar, error: errorLieferbar, data: dataLieferbar } = useQuery(FILTER_BOOKS_LIEFERBAR, {
        variables: { lieferbar },
        skip: ignorieren === true,
    });

    const uniqueBooks = useMemo(() => {
        const ratingBooks = dataRating?.buecher || [];
        const artBooks = dataArt?.buecher || [];
        const lieferbarBooks = dataLieferbar?.buecher || [];
        const allBooks = [...ratingBooks, ...artBooks, ...lieferbarBooks];
        return removeDuplicates(allBooks);
    }, [dataRating, dataArt, dataLieferbar]);

    if (loadingRating || loadingArt || loadingLieferbar) return <p>Loading...</p>;
    if (errorRating) return <p>Error in rating query: {errorRating.message}</p>;
    if (errorArt) return <p>Error in art query: {errorArt.message}</p>;
    if (errorLieferbar) return <p>Error in Lieferbar query: {errorLieferbar.message}</p>;

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={2}
            mt={4}
        >
            {uniqueBooks.map(({ id, isbn, titel, preis, art }) => (
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
