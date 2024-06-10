import { TextField } from '@mui/material';

export default function SearchBar({ searchText, onSearchTextChange }) {
  return (
    <TextField
      label="Suche..."
      id="outlined-size-small"
      size="small"
      value={searchText}
      onChange={(e) => onSearchTextChange(e.target.value)}
    />
  );
}