import { Checkbox } from  '@mui/material';
import * as React from 'react';

export default function ControlledCheckbox() {
  
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    console.log("Yes");
  };

  const clickMe=() => {console.log("Yes");}
  return (
    <Checkbox
      checked={checked}
      onMouseOver={clickMe}
      onClick={clickMe}
      onChange={clickMe}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}