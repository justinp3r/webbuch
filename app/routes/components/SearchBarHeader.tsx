import { TextField } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/ban-types
export default function SearchBarHeader({ searchText, onSearchTextChange }:{searchText:string, onSearchTextChange: Function}) {
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
