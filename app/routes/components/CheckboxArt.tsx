import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

function CheckboxArt() {
    const [checkedKindle, setCheckedKindle] = React.useState(true);

    const [checkedDruck, setCheckedDruck] = React.useState(true);


    const handleChangeKindle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedKindle(event.target.checked);
        window.localStorage.setItem('checkedKindle', JSON.stringify(!checkedKindle));
        console.log("Kindle" + window.localStorage.getItem('checkedKindle'));

    };

    const handleChangeDruck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedDruck(event.target.checked);
        window.localStorage.setItem('checkedDruck', JSON.stringify(!checkedDruck));
        console.log("Druck" + window.localStorage.getItem('checkedDruck'));

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
