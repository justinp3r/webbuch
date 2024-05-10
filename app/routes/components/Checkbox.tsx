import * as React from 'react';
import { Checkbox } from  '@mui/material';

export default function CheckboxLabels() {

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
  return (
    <Checkbox
        checked={true}
        onChange={e => { console.log(e);}}
        inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
