import { AlternateEmailRounded, LockTwoTone } from '@mui/icons-material';
import { Box, Button, Link, Paper, Stack, TextField, styled } from '@mui/material';
import React, { useState } from 'react';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    width: '300px',
    alignItems: 'center',
    borderRadius: '20px'
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.color3.main,
    '&:hover': {
        backgroundColor: theme.palette.color3.dark,
    }
}));

const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Pour la redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Réinitialiser les erreurs

        try {
            const response = await fetch('http://arocseback.cluster-ig3.igpolytech.fr/api/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Inclure les cookies dans la requête
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Connexion réussie', data);
                navigate('/profile'); // Rediriger l'utilisateur vers la page de profil après connexion réussie
            } else {
                console.log("response", response);
                const errorData = await response.json();
                console.log(errorData);
                setError(errorData.error || 'Erreur de connexion');
            }
        } catch (err) {
            console.error('Erreur lors de la connexion', err);
            setError('Erreur serveur');
        }
    };

    return (
        <div style={{ marginTop: '100px', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <form onSubmit={handleSubmit}>
                <Item elevation={24}>
                    <Stack spacing={3} alignItems={'center'}>
                        <h2 style={{ paddingTop: '20px' }}>Connexion</h2>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <AlternateEmailRounded sx={{ color: '#F45050', mr: 1, my: 0.5 }} />
                            <TextField
                                id="email"
                                label="Identifiant"
                                variant="standard"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockTwoTone sx={{ color: '#F45050', mr: 1, my: 0.5 }} />
                            <TextField
                                id="password"
                                label="Mot de passe"
                                variant="standard"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Box>
                        <SubmitButton theme={theme} variant="contained" style={{ marginTop: '35px' }} type="submit">
                            Se connecter
                        </SubmitButton>
                        <Link href='/Register' underline="hover" color={{ color: '#F45050' }} style={{ paddingBottom: '30px' }}>
                            {'Nouvel utilisateur'}
                        </Link>
                    </Stack>
                </Item>
            </form>
        </div>
    );
};

export default SigninForm;
