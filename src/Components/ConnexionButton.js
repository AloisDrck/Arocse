import { AccountCircle } from '@mui/icons-material';
import { Button, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import theme from '../styles/theme';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.color3.main,
    '&:hover': {
        backgroundColor: theme.palette.color3.dark,
    },
}));

const ConnexionButton = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Vérifiez si le jeton d'authentification est dans le localStorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleNavigation = (url) => {
        // Naviguer vers l'URL spécifiée
        window.location.href = url;
    };

    const handleLogout = () => {
        // Supprimer le jeton d'authentification du localStorage
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        handleNavigation('/Home');
    };

    return (
        <div style={{ height: '0', paddingRight: '5%', textAlign: 'right' }}>
            {!isAuthenticated && (
                <StyledButton theme={theme} variant="contained" endIcon={<AccountCircle />} onClick={() => { handleNavigation('/Signin') }}>
                    Connexion
                </StyledButton>
            )}
            {isAuthenticated && (
                <StyledButton variant="contained" endIcon={<AccountCircle />} onClick={handleLogout}>
                    Déconnexion
                </StyledButton>
            )}
        </div>
    );
};

export default ConnexionButton;