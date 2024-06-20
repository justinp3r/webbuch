import * as React from 'react';
import { Rating, Box } from '@mui/material';

export default function RatingStars() {
    const [value, setValue] = React.useState<number | null>(2);
    (typeof window !== 'undefined' && window.localStorage.setItem('rating', JSON.stringify(value)));

    return (
        <Box
            sx={{
                '& > legend': { mt: 1 },
            }}
        >
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    console.log(newValue);
                    window.localStorage.setItem('rating', JSON.stringify(newValue));
                }}
            />
        </Box>
    );
}
