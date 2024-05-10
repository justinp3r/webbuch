import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function MyComponent() {
  const textMe="Import funktioniert so!";

  return (
    <div>
      <h1>{textMe}</h1>
      <p>Lorem Ipsum dies blub bla </p>
    </div>
  );
}

export default MyComponent;