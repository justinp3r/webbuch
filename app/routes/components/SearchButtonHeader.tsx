import { Button } from '@mui/material';
import {
    getSucheAlleBuecher,
    setSucheAlleBuecher,
    getSucheBuchID,
    setSucheBuchID,
} from '../_index';
import { useState } from 'react';

export default function SearchButtonHeader({ searchText }: {searchText: string}) {
    const [valueAlleBuecher, setValueAlleBuecher] =
        useState(getSucheAlleBuecher);
    const [valueBuecherMitID, setValueBuecherMitID] = useState(getSucheBuchID);

    const handleClick = () => {
        console.log('Suchtext:', searchText);
        setSucheAlleBuecher(false);
        setSucheBuchID(searchText);

        setValueAlleBuecher(getSucheAlleBuecher());
        setValueBuecherMitID(getSucheBuchID());
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
