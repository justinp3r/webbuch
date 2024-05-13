
import type { MetaFunction } from '@remix-run/node';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Box, Card, CardContent, CardActions, FormGroup, Checkbox,FormControlLabel, TextField} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import BasicSelect from './components/Dropdown';
import MyComponent from './components/komp';

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
        <BasicSelect></BasicSelect>
      </div>  
    </main>
  );
}