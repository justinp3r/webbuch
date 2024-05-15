
import type { MetaFunction } from '@remix-run/node';
import { AppBar, Toolbar, Typography, Button, Box, FormGroup,FormControlLabel, TextField, ThemeProvider} from '@mui/material';
import ControlledCheckbox from './components/Checkbox';
import Checkboxes from './components/CheckboxV2';
import React from 'react';
import theme from '../../theme';

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  
  return (
    <ThemeProvider theme={theme}>
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
        <Button variant="outlined" size="medium" sx={{ marginLeft: '15px', lineHeight:'2'}} type="submit" >Suchen</Button>
        <h4>Buchart</h4>
        <FormGroup>
          <FormControlLabel 
            control={<ControlledCheckbox/>} 
            label="Kindle" />
          <FormControlLabel 
            control={<ControlledCheckbox/>} 
            label="Druckausgabe" />
        </FormGroup>
        <h4>Schlagwörter</h4>
        <FormGroup>
          <FormControlLabel 
            control={<ControlledCheckbox/>} 
            label="Javascript" />
          <FormControlLabel 
            control={<ControlledCheckbox/>} 
            label="Typescript" />
        </FormGroup>
    </ThemeProvider>
  );
}