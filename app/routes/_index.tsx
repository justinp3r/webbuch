
import type { MetaFunction } from '@remix-run/node';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box, Card, CardContent, CardActions, FormGroup, Checkbox,FormControlLabel, TextField} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import BasicSelect from './components/Dropdown';
import CheckboxLabels from './components/Checkbox';
import React from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  
  return (
    <main id="content">
      <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1' }}>
      <React.Fragment>
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
        <Button variant="outlined" size="medium" sx={{ marginLeft: '15px', lineHeight:'2'}}>Suchen</Button>
        <h4>Buchart</h4>
        <FormGroup>
          <FormControlLabel 
            control={<CheckboxLabels/>} 
            label="Kindle" />
          <FormControlLabel 
            control={<CheckboxLabels/>} 
            label="Druckausgabe" />
        </FormGroup>
        <h4>Schlagwörter</h4>
        <FormGroup>
          <FormControlLabel 
            control={<CheckboxLabels/>} 
            label="Javascript" />
          <FormControlLabel 
            control={<CheckboxLabels/>} 
            label="Typescript" />
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
        </FormGroup>
        </React.Fragment>
      </div>  
    </main>
  );
}