import { Button } from "@mui/material";

export default function SearchButtonHeader({ searchText }) {

    const handleClick = () => {
        console.log('Suchtext:', searchText);
      };

  return (
    <Button
      variant="contained"
      size="medium"
      color="secondary"
      sx={{ marginLeft: '15px' }}
      onClick={handleClick}
    >
      Suchen
    </Button>
  );
}