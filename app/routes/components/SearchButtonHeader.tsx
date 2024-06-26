import { Button } from '@mui/material';
import {
    getSucheBuchID,
    setSucheBuchID,
} from '../_index';
import { useState } from 'react';

export default function SearchButtonHeader({ searchText }: {searchText: string}) {
    const [valueBuecherMitID, setValueBuecherMitID] = useState(getSucheBuchID);
    const handleClick = () => {
        console.log('Suchtext:', searchText);
        setSucheBuchID(searchText);
        setValueBuecherMitID(getSucheBuchID());
        console.log(valueBuecherMitID)
        console.log('GESUCHT WIRD ' + getSucheBuchID());
    };

    return (
        <Button
            variant="contained"
            size="medium"
            color="secondary"
            sx={{ marginLeft: '15px' }}
            onClick={handleClick}
        >
            Suchen
        </Button>
    );
}
