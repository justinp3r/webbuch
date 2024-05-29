
import type { MetaFunction } from '@remix-run/node';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box, Card, CardContent, CardActions, FormGroup, Checkbox,FormControlLabel, TextField} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import BasicSelect from './components/Dropdown';
import MyComponent from './components/komp';
import CheckboxLabels from './components/Checkbox';
import { AppBar, Toolbar, Typography, Button, Box, FormGroup,FormControlLabel, TextField, Checkbox} from '@mui/material';
import React from 'react';
import CheckboxSchlagwörter from './components/CheckboxSchlagwörter';

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  
  return (
    <>
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
        </FormGroup>
      <div>  
        <Button variant="outlined" size="medium" sx={{ marginLeft: '15px', lineHeight:'2'}} >Suchen</Button>
        <h4>Buchart</h4>
        <FormGroup>
          <FormControlLabel 
            control={<Checkbox/>} 
            label="Kindle" />
          <FormControlLabel 
            control={<Checkbox/>} 
            label="Druckausgabe" />
        </FormGroup>
        <h4>Schlagwörter</h4>
        <CheckboxSchlagwörter/>
    </div>  
    </React.Fragment>

  );
}