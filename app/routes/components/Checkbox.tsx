import { Checkbox } from  '@mui/material';
import React from 'react';

export default function ControlledCheckbox() {

  const [checked, setChecked] = React.useState(true);

  const handleChange=() => {console.log("Yes");}
  
  return (
    <Checkbox
      checked={checked}
      onMouseOver={(handleChange)}
      onClick={handleChange}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}