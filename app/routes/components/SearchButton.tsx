import { Button } from "@mui/material";

export default function SearchButton({ searchText }) {
  const handleClick = () => {
    console.log('Suchtext:', searchText);
  };

  return (
    <Button
      variant="outlined"
      size="medium"
      sx={{ marginLeft: '15px', lineHeight: '2' }}
      onClick={handleClick}
    >
      Suchen
    </Button>
  );
}