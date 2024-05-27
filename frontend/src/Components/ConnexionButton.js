import { AccountCircle } from '@mui/icons-material';
import { Button, styled } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Context/UserContext';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.color3.main,
    '&:hover': {
        backgroundColor: theme.palette.color3.dark,
    },
}));

const ConnexionButton = () => {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleNavigation = (url) => {
        // Naviguer vers l'URL spécifiée
        window.location.href = url;
    };

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:3000/api/user/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/Signin'); // Rediriger vers la page de connexion après déconnexion
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    return (
        <div style={{ height: '0', paddingRight: '5%', textAlign: 'right' }}>

            {user ? (
                <StyledButton theme={theme} variant="contained" endIcon={<AccountCircle />} onClick={handleLogout}>
                    Déconnexion
                </StyledButton>
            ) : (
                <StyledButton theme={theme} variant="contained" endIcon={<AccountCircle />} onClick={() => { handleNavigation('/Signin') }}>
                    Connexion
                </StyledButton>
            )}

        </div>
    );
};

export default ConnexionButton;