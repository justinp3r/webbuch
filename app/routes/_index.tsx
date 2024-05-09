import React, { useState } from 'react';
import type { MetaFunction } from '@remix-run/node';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

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
    <React.Fragment>
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
          <img src="../../public/open-book.png" height="100" width="100" alt="logo"></img>
          <p>Ein Semesterprojekt</p>
          <input
            type="text"
            placeholder="Suchen..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button>Suchen</button>
          <Button variant="outlined">Primary</Button>
          <h3>Buchart</h3>
          <p><Link to="/">Kindle</Link></p>
          <p><Link to="/">Druck</Link></p>
          
        </div>
      </main>
    </React.Fragment>
  );
}