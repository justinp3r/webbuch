import { Button, Link } from '@mui/material';
import {
    getSucheAlleBuecher,
    setSucheAlleBuecher,
    getSucheBuchID,
    setSucheBuchID,
} from '../_index';
import { useState } from 'react';

export default function FilterButtonHeader() {

    const handleClick = () => {
        console.log(
            'Status: ' +
                (typeof window !== 'undefined' &&
                    window.localStorage.getItem('checkedJS')),
                    window.localStorage.getItem('checkedTS'),
                    window.localStorage.getItem('rating'),
                    window.localStorage.getItem('checkedKindle'),
                    window.localStorage.getItem('checkedDruck')
        );

    };

    return (
            <Button
                variant="contained"
                size="medium"
                color="secondary"
                sx={{ marginLeft: '20px' }}
                onClick={handleClick}
            >
                Filter los
            </Button>
    );
}
