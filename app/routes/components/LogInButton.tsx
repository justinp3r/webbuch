import React from 'react';
import { Button } from '@mui/material';

interface LoginLogoutButtonsProps {
    isLoggedIn: boolean;
    onLogout: () => void;
    onLogin: () => void;
}

const LoginLogoutButtons: React.FC<LoginLogoutButtonsProps> = ({
    isLoggedIn,
    onLogout,
    onLogin,
}) => {
    return isLoggedIn ? (
        <Button
            variant="contained"
            color="secondary"
            onClick={onLogout}
            sx={{ marginRight: '15px' }}
        >
            Logout
        </Button>
    ) : (
        <Button
            variant="contained"
            color="secondary"
            onClick={onLogin}
            sx={{ marginRight: '15px' }}
        >
            Login
        </Button>
    );
};

export default LoginLogoutButtons;
