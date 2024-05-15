import * as React from 'react';
import { FormGroup,FormControlLabel,Checkbox }  from '@mui/material';

export default function CheckboxLabels() {
  const [checked, setChecked] = React.useState(true);
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />} 
    label="Label" />
    </FormGroup>
  );
}
