import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useState } from 'react';

function CheckboxSchlagwörter() {
    const [checkedJS, setCheckedJS] = useState(
       /* JSON.parse(window.localStorage.getItem('checkedJS') || 'true')*/ true);
    const [checkedTS, setCheckedTS] = useState(
        /*JSON.parse(window.localStorage.getItem('checkedTS') || 'true')*/ true
    );



    const handleChangeJS = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedJS(event.target.checked);
        window.localStorage.setItem('checkedJS', JSON.stringify(!checkedJS));
        console.log("JS" +  window.localStorage.getItem('checkedJS'));
        
    };

    const handleChangeTS = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedTS(event.target.checked);
        window.localStorage.setItem('checkedTS', JSON.stringify(!checkedTS));
        console.log("TS" + window.localStorage.getItem('checkedTS'));
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
