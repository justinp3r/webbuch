import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { FormGroup, Checkbox,FormControlLabel, TextField} from '@mui/material';
import SearchAppBar from './components/SearchAppBar';

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
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
              <TextField 
                id="outlined-basic" 
                label="Outlined"
                variant="outlined"
                size="small"
                label="Suche"
              />
            <Button variant="contained" color="secondary" disableElevation>Login</Button>
          </Toolbar>
        </AppBar>
        </Box>
        <h1>Webbuch</h1>
        <img src="../../public/open-book.png" height="100" width="100" alt="logo"></img>
        <p>Ein Semesterprojekt</p>
        <TextField
          label="Suche..."
          id="outlined-size-small"
          size="small"
        />
        <Button variant="outlined" size="large">Suchen</Button>
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