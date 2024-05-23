
import type { MetaFunction } from '@remix-run/node';
import { Button, TextField} from '@mui/material';
import CheckboxSchlagwörter from './components/checkboxSchlagwörter';
import CheckboxArt from './components/checkboxArt';

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
        <Button variant="outlined" size="medium" sx={{ marginLeft: '15px', lineHeight:'2'}} >Suchen</Button>
        <h4>Buchart</h4>
        <CheckboxArt/>
        <h4>Schlagwörter</h4>
        <CheckboxSchlagwörter/>
        
    </>
  );
} 