import { TextField } from '@mui/material';

export default function SearchBarHeader({ searchText, onSearchTextChange }) {
  return (
    <TextField
      label="Suche"
      id="outlined-size-small"
      size="small"
      variant="outlined"
      focused 
      color="secondary"
      value={searchText}
      onChange={(e) => onSearchTextChange(e.target.value)}
    />
  );
}