import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

function CheckboxArt() {
    const [checkedKindle, setCheckedKindle] = React.useState(true);

    const [checkedDruck, setCheckedDruck] = React.useState(true);

    (typeof window !== 'undefined' && window.localStorage.setItem('checkedDruck', JSON.stringify(checkedDruck)));
    (typeof window !== 'undefined' && window.localStorage.setItem('checkedKindle', JSON.stringify(checkedKindle)));


    const handleChangeKindle = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Checkbox Kindle clicked!');
        setCheckedKindle(event.target.checked);
        window.localStorage.setItem('checkedKindle', JSON.stringify(checkedKindle));

    };

    const handleChangeDruck = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Checkbox Druck clicked!');
        setCheckedDruck(event.target.checked);
        window.localStorage.setItem('checkedDruck', JSON.stringify(checkedDruck));

    };
    return (
        <>
            <FormGroup>
                <FormControlLabel
                    sx={{ display: 'flex', boxSizing: 'border-box' }}
                    control={
                        <Checkbox
                            checked={checkedKindle}
                            onChange={handleChangeKindle}
                        />
                    }
                    label="Kindle"
                />
                <FormControlLabel
                    sx={{ display: 'flex', boxSizing: 'border-box' }}
                    control={
                        <Checkbox
                            checked={checkedDruck}
                            onChange={handleChangeDruck}
                        />
                    }
                    label="Druckausgabe"
                />
            </FormGroup>
        </>
    );
}

export default CheckboxArt;
