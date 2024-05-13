import * as React from 'react';
import {Box,InputLabel,MenuItem,FormControl, Select} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    console.log("Jüüürgen");
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120,  maxWidth: 300}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
          
        >
          
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}