import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React from 'react';

function CheckboxSchlagwörter() {
    const [checkedJS, setCheckedJS] = React.useState(true);

    const [checkedTS, setCheckedTS] = React.useState(true);

    const handleChangeJS = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Checkbox JS clicked!');
        setCheckedJS(event.target.checked);
    };

    const handleChangeTS = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Checkbox TS clicked!');
        setCheckedTS(event.target.checked);
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
