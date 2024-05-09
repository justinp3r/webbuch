import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FormGroup, Checkbox,FormControlLabel, TextField} from '@mui/material';

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Hier können Sie die Suchlogik implementieren
  };

  return (
    <main id="content">
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1' }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography>
              HKA
            </Typography>
          </Toolbar>
        </AppBar>
        <h1>Webbuch</h1>
        <img src="../../public/open-book.png" height="100" width="100"></img>
        <p>Ein Semesterprojekt</p>
        <TextField 
          id="outlined-basic" 
          label="Outlined"
          variant="outlined"
          size="small"
          />
        <Button variant="outlined" size="large">Outlined</Button>
        <h3>Buchart</h3>
        <FormGroup>
          <FormControlLabel 
            control={<Checkbox
            checked={true}
            onChange={undefined}
            inputProps={{ 'aria-label': 'controlled' }}
          />} label="Kindle" />
          <FormControlLabel control={<Checkbox />} label="Druckausgabe" />
        </FormGroup>
        
      </div>
      
      
    </main>
  );
}