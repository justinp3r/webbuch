import type { MetaFunction } from '@remix-run/node';
import CheckboxSchlagwörter from './components/CheckboxSchlagwörter';
import CheckboxArt from './components/CheckboxArt';
import {ApolloClient} from "../../node_modules/@apollo/client/core/ApolloClient"; 
import {ApolloProvider} from "../../node_modules/@apollo/client/react/context/ApolloProvider";
import {InMemoryCache} from "../../node_modules/@apollo/client/cache/inmemory/inMemoryCache";
import {useQuery} from "../../node_modules/@apollo/client/react/hooks/useQuery";
import {gql} from "../../node_modules/graphql-tag/src/index";
import { Box, Paper, Typography } from '@mui/material';
import RatingStars from './components/RatingStars';
import AlleBuecher from '~/graphql/AlleBuecher';
import BuchMitID from '~/graphql/BuchMitID';
import { Button } from '@mui/material';

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

// TODO: Workaround für Zertifikate finden
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const meta: MetaFunction = () => {
  return [
    { title: "Webbuch" },
    { name: "description", content: "Welcome to our Semesterproject!" },
  ];
};

let sucheBuchID: string | null=null;
let sucheAlleBuecher=true;

export const getSucheBuchID= () => sucheBuchID;
export const setSucheBuchID = (newValue: string) => {sucheBuchID= newValue;};

export const getSucheAlleBuecher= () => sucheAlleBuecher;
export const setSucheAlleBuecher = (newValue: boolean) => {sucheAlleBuecher= newValue;};

export default function Index() {
  return (
    <>
      <Box display="flex">
        <Box
          sx={{
            width: '250px',
            padding: '20px',
            borderRight: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <img src="../../public/open-book.png" height="100" width="100" alt="logo" />
          <p>Willkommen!</p>
          <h4>Buchart</h4>
          <CheckboxArt />
          <h4>Schlagwörter</h4>
          <CheckboxSchlagwörter />
          <h4>Bewertungen</h4>
          <RatingStars></RatingStars>
          <Box sx={{ marginTop: '1rem' }}>
            <Button variant="outlined" color="primary">
              Filter los
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, padding: '20px' }}>
          <ApolloProvider client={client}>
            <AlleBuecher condition={sucheAlleBuecher} />
            <BuchMitID id={sucheBuchID}></BuchMitID>
          </ApolloProvider>
        </Box>
      </Box>
    </>
  );
}