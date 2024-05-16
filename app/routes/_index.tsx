
import type { MetaFunction } from '@remix-run/node';
import { AppBar, Toolbar, Typography, Button, Box, FormGroup,FormControlLabel, TextField, Checkbox} from '@mui/material';
import React from 'react';
import CheckboxSchlagwörter from './components/CheckboxSchlagwörter';
import CheckboxArt from './components/CheckboxArt';

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  
  return (
    <React.Fragment>
      <main id="content">
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1' }}>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ flexGrow: 1 }}>
                HKA
              </Typography>
            <Button variant="contained" color="secondary" disableElevation sx={{ marginRight: '15px' }}>Login</Button>
            <Button variant="contained" color="secondary" disableElevation>Analyse</Button>
          </Toolbar>
        </AppBar>
        </Box>
        <h1>Webbuch</h1>
        <img src="../../public/open-book.png" height="100" width="100" alt="logo"></img>
        <p>Willkommen!</p>
        <TextField
          label="Suche..."
          id="outlined-size-small"
          size="small"
        />
        <Button variant="outlined" size="medium" sx={{ marginLeft: '15px', lineHeight:'2'}} >Suchen</Button>
        <h4>Buchart</h4>
        <CheckboxArt/>
        <h4>Schlagwörter</h4>
        <CheckboxSchlagwörter/>
    </div>  
    </main>
    </React.Fragment>

  );
}