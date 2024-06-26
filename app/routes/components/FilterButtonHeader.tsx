import { Button } from '@mui/material';

export default function FilterButtonHeader() {
    const handleClick = () => {
        console.log(
            'Status: ' +
                    window.localStorage.getItem('checkedKindle'),
                    window.localStorage.getItem('checkedDruck'),
                    window.localStorage.getItem('checkedJS'),
                    window.localStorage.getItem('checkedTS'),
                    window.localStorage.getItem('rating'),
        );
    };

    return (
            <Button
                variant="contained"
                size="medium"
                color="secondary"
                sx={{ marginLeft: '20px' }}
                onClick={handleClick}
            >
                Filter los
            </Button>
    );
}
