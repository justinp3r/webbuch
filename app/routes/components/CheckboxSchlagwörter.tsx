import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';

function CheckboxSchlagwörter() {
    const [checkedJS, setCheckedJS] = React.useState(
       /* JSON.parse(window.localStorage.getItem('checkedJS') || 'true')*/ true);
    const [checkedTS, setCheckedTS] = React.useState(
        /*JSON.parse(window.localStorage.getItem('checkedTS') || 'true')*/ true
    );

    (typeof window !== 'undefined' && window.localStorage.setItem('checkedJS', JSON.stringify(checkedJS)));
    (typeof window !== 'undefined' && window.localStorage.setItem('checkedTS', JSON.stringify(checkedTS)));

    const handleChangeJS = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedJS(event.target.checked);
        window.localStorage.setItem('checkedJS', JSON.stringify(checkedJS));

    };

    const handleChangeTS = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedTS(event.target.checked);
        window.localStorage.setItem('checkedTS', JSON.stringify(checkedTS));

    };

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    sx={{ display: 'flex', boxSizing: 'border-box' }}
                    control={
                        <Checkbox
                            checked={checkedJS}
                            onChange={handleChangeJS}
                        />
                    }
                    label="Javascript"
                />
                <FormControlLabel
                    sx={{ display: 'flex', boxSizing: 'border-box' }}
                    control={
                        <Checkbox
                            checked={checkedTS}
                            onChange={handleChangeTS}
                        />
                    }
                    label="Typescript"
                />
            </FormGroup>
        </>
    );
}

export default CheckboxSchlagwörter;
