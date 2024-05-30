import type { MetaFunction } from '@remix-run/node';
import { Button, TextField} from '@mui/material';
import CheckboxSchlagwörter from './components/CheckboxSchlagwörter';
import CheckboxArt from './components/CheckboxArt';
import { useState, useEffect } from 'react';
import { gql, GraphQLClient } from 'graphql-request';
import GraphHook from '~/graphql/graphql.hooks';

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to our Semesterproject!" },
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
        <GraphHook></GraphHook> 
    </>
  );
} 