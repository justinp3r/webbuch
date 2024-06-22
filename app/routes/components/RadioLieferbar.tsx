import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';

function LieferbarToggle() {
  const [checkedLieferbar, setCheckedLieferbar] = useState(true);
  const [checkedIgnorieren, setCheckedIgnorieren] = useState(true);

  const handleChangeLieferbar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setCheckedLieferbar(newValue);
    window.localStorage.setItem('checkedLieferbar', JSON.stringify(!checkedLieferbar));
    console.log("Lieferbar" +  window.localStorage.getItem('checkedLieferbar'));
}

  const handleChangeIgnorieren = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setCheckedIgnorieren(newValue);
    window.localStorage.setItem('checkedIgnorieren', JSON.stringify(!checkedIgnorieren));
    console.log("ignorieren" +  window.localStorage.getItem('checkedIgnorieren'));
  }
 
  return (
    <FormGroup>
      <FormControlLabel
        sx={{ display: 'flex', boxSizing: 'border-box' }}
        control={
          <Checkbox
            checked={checkedLieferbar}
            onChange={handleChangeLieferbar}
          />
        }
        label="Lieferbar"
      />
      <FormControlLabel
        sx={{ display: 'flex', boxSizing: 'border-box' }}
        control={
          <Checkbox
            checked={checkedIgnorieren}
            onChange={handleChangeIgnorieren}
          />
        }
        label="Ignorieren"
      />
    </FormGroup>
  );
}

export default LieferbarToggle;