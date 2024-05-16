import {
    Checkbox,
    FormControlLabel,
    FormGroup,
  } from '@mui/material';
  
  function CheckboxArt() {
    return (
      <>
        <FormGroup>
          <FormControlLabel
            sx={{ display: 'flex', boxSizing: 'border-box' }}
            control={<Checkbox defaultChecked />}
            label="Kindle"
          />
          <FormControlLabel
            sx={{ display: 'flex', boxSizing: 'border-box' }}
            control={<Checkbox defaultChecked />}
            label="Druckausgabe"
          />
        </FormGroup>
      </>
    );
  }
  
  export default CheckboxArt;