import { useState } from 'react';
import { Box, TextField, Button, RadioGroup, FormControlLabel, Radio, Checkbox, FormControl, FormLabel, Rating, Select, MenuItem } from '@mui/material';
import { useMutation } from '../../node_modules/@apollo/client/react/hooks/useMutation';
import { gql } from '../../node_modules/graphql-tag/src/index';

const CREATE_BOOK_MUTATION = gql`
  mutation CreateBook(
    $isbn: String!
    $rating: Int!
    $preis: Float!
    $rabatt: Float!
    $lieferbar: Boolean!
    $datum: String!
    $homepage: String!
    $schlagwoerter: [String!]!
    $titel: TitelInput!
    $abbildungen: [AbbildungInput!]!
  ) {
    create(
      input: {
        isbn: $isbn
        rating: $rating
        preis: $preis
        rabatt: $rabatt
        lieferbar: $lieferbar
        datum: $datum
        homepage: $homepage
        schlagwoerter: $schlagwoerter
        titel: $titel
        abbildungen: $abbildungen
      }
    ) {
      id
    }
  }
`;


const CreateBook = () => {

  const [createBook, { data, loading, error: error1 }] = useMutation(CREATE_BOOK_MUTATION, {
    onError:(err)=>{
        console.log("Fehler!: "+err);
    }  });

  const [isbn, setIsbn] = useState('');
  const [rating, setRating] = useState(0);
  const [art, setArt] = useState('KINDLE');
  const [preis, setPreis] = useState('');
  const [rabatt, setRabatt] = useState('');
  const [lieferbar, setLieferbar] = useState(false);
  const [datum, setDatum] = useState('');
  const [homepage, setHomepage] = useState('');
  const [schlagwoerter, setSchlagwoerter] = useState([]);
  const [titel, setTitel] = useState({ titel: '', untertitel: '' });
  const [abbildungen, setAbbildungen] = useState([{ beschriftung: '', contentType: '' }]);
  const [Error0, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (loading) return null;
  if (error1) return `Error! ${error1}`;
  console.log(typeof data);

  const handleSchlagwoerterChange = (event) => {
    const value = event.target.value;
    setSchlagwoerter((prev) =>
      event.target.checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    // Validierungen
    if (!/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1,7}$/.test(isbn)) {
      setError('ISBN muss gültig sein.');
      return;
    }
    if (rating === 0) {
      setError('Rating muss ausgewählt werden.');
      return;
    }
    if (!rabatt) {
      setError('Rabatt muss ausgewählt werden.');
      return;
    }
    if (isNaN(preis) || preis <= 0) {
      setError('Preis muss eine positive Zahl sein.');
      return;
    }
    if (isNaN(rabatt) || rabatt < 0 || rabatt > 1) {
      setError('Rabatt muss eine Zahl zwischen 0.00 und 1.00 sein.');
      return;
    }
    if (!datum) {
      setError('Datum muss ausgewählt werden.');
      return;
    }
    if (!homepage) {
      setError('Homepage darf nicht leer sein.');
      return;
    }
    if (!titel.titel || !titel.untertitel) {
      setError('Titel und Untertitel dürfen nicht leer sein.');
      return;
    }
    if (!abbildungen[0].beschriftung || !abbildungen[0].contentType) {
      setError('Beschriftung und Content Type der Abbildungen dürfen nicht leer sein.');
      return;
    }

    console.log({
        isbn,
            rating,
            preis,
            rabatt,
            lieferbar,
            datum,
            homepage,
            schlagwoerter,
            titel: {
              titel: titel.titel,
              untertitel: titel.untertitel,
            },
            abbildungen: [
              {
                beschriftung: abbildungen[0].beschriftung,
                contentType: abbildungen[0].contentType,
              },
            ],
      });

      try {
        const { data } = await createBook({
          variables: {
            isbn,
            rating,
            preis: parseFloat(preis), // Konvertiere preis zu Float
            rabatt: parseFloat(rabatt), // Konvertiere rabatt zu Float
            lieferbar,
            datum,
            homepage,
            schlagwoerter,
            titel: {
              titel: titel.titel,
              untertitel: titel.untertitel,
            },
            abbildungen: [
              {
                beschriftung: abbildungen[0].beschriftung,
                contentType: abbildungen[0].contentType,
              },
            ],
          },
        });
        
        if (data && data.create) {
          setSuccess('Buch erfolgreich angelegt!');
          console.log('Neues Buch angelegt mit ID:', data.create.id);
        } else {
          setError('Fehler beim Anlegen des Buches: '+error1);
        }
      } catch (err) {
        console.error('Fehler beim Anlegen des Buches:', err);
        setError('Fehler beim Anlegen des Buches.');
      }

    
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mx: 'auto',
        maxWidth: 500,
        mt: 5
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <h1>Buch hinzufügen</h1>
        <img src="public/CreateBook.jpeg" alt="Create Book" style={{ width: '120px', height: '120px', marginLeft: '20px' }} />
      </Box>
      <TextField
        label="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
        <FormLabel component="legend">Rating</FormLabel>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          required
        />
      </Box>
      <FormControl component="fieldset" margin="normal" fullWidth>
        <FormLabel component="legend">Art</FormLabel>
        <RadioGroup
          row
          value={art}
          onChange={(e) => setArt(e.target.value)}
        >
          <FormControlLabel value="KINDLE" control={<Radio />} label="KINDLE" />
          <FormControlLabel value="DRUCKAUSGABE" control={<Radio />} label="DRUCKAUSGABE" />
        </RadioGroup>
      </FormControl>
      <TextField
        label="Preis"
        value={preis}
        onChange={(e) => setPreis(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal">
        <FormLabel>Rabatt</FormLabel>
        <Select
          value={rabatt}
          onChange={(e) => setRabatt(e.target.value)}
          displayEmpty
          required
        >
          {[...Array(101).keys()].map((value) => (
            <MenuItem key={value} value={(value / 100).toFixed(2)}>
              {(value / 100).toFixed(2)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl component="fieldset" margin="normal" fullWidth>
        <FormLabel component="legend">Lieferbar</FormLabel>
        <FormControlLabel
          control={<Checkbox checked={lieferbar} onChange={(e) => setLieferbar(e.target.checked)} />}
          label="Ja"
        />
      </FormControl>
      <TextField
        label="Datum"
        type="date"
        value={datum}
        onChange={(e) => setDatum(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Homepage"
        value={homepage}
        onChange={(e) => setHomepage(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <FormControl component="fieldset" margin="normal" fullWidth>
        <FormLabel component="legend">Schlagwoerter</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              value="JAVASCRIPT"
              checked={schlagwoerter.includes('JAVASCRIPT')}
              onChange={handleSchlagwoerterChange}
            />
          }
          label="JAVASCRIPT"
        />
        <FormControlLabel
          control={
            <Checkbox
              value="TYPESCRIPT"
              checked={schlagwoerter.includes('TYPESCRIPT')}
              onChange={handleSchlagwoerterChange}
            />
          }
          label="TYPESCRIPT"
        />
      </FormControl>
      <TextField
        label="Titel"
        value={titel.titel}
        onChange={(e) => setTitel({ ...titel, titel: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Untertitel"
        value={titel.untertitel}
        onChange={(e) => setTitel({ ...titel, untertitel: e.target.value })}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Beschriftung"
        value={abbildungen[0].beschriftung}
        onChange={(e) => setAbbildungen([{ ...abbildungen[0], beschriftung: e.target.value }])}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Content Type"
        value={abbildungen[0].contentType}
        onChange={(e) => setAbbildungen([{ ...abbildungen[0], contentType: e.target.value }])}
        fullWidth
        margin="normal"
        required
      />
      {Error0 && (
        <Box sx={{ color: 'red', mt: 2 }}>
          {Error0}
        </Box>
      )}
      {success && (
        <Box sx={{ color: 'green', mt: 2 }}>
          {success}
        </Box>
      )}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 5 }}>
        HINZUFÜGEN
      </Button>
    </Box>
  );
};

export default CreateBook;