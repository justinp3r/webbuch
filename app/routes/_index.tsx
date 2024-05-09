import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

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
        <AppBar position="static">
          <Toolbar>
            <Typography>
              HKA
            </Typography>
          </Toolbar>
        </AppBar>
        <h1>Webbuch</h1>
        <img src="../../public/open-book.png" height="100" width="100"></img>
        <p>Ein Semesterprojekt</p>
        <input
          type="text"
          placeholder="Suchen..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button>Suchen</button>
        <h3>Buchart</h3>
        <p><Link to="/notes">Kindle</Link></p>
        <p><Link to="/notes">Druck</Link></p>
        
      </div>
      
      
    </main>
  );
}