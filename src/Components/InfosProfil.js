import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Stack, styled } from '@mui/material';
import theme from '../styles/theme';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.color1.main,
    textAlign: 'center',
    width: '300px',
    alignItems: 'center',
    borderRadius: '20px',
    padding: '40px'
}));

const NameColor = styled('span')(({ theme }) => ({
    color: theme.palette.color3.main,
}));

const InfosProfil = () => {
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState([]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const months = [
            'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
        ];
        return `${day} ${months[month]} ${year}`;
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://arocseback.cluster-ig3.igpolytech.fr/api/user', { withCredentials: true });
                setUser(response.data);

                const scoresResponse = await axios.get(`http://arocseback.cluster-ig3.igpolytech.fr/api/scores/${response.data.name}`);
                setScores(scoresResponse.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ marginTop: '100px', position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Item elevation={24} theme={theme} >
                <Stack spacing={3} alignItems={'center'}>
                    <h1>Bonjour <NameColor theme={theme}>{user.name}</NameColor> !</h1>
                    <p><NameColor theme={theme}>E-mail</NameColor> : {user.email}</p>
                    {/* Ajoutez d'autres informations utilisateur ici */}
                    <div>
                        <br></br><h2>Vos scores :</h2><br></br>
                        <ul>
                            {scores.map((score, index) => (
                                <li key={index}>{score.score} → {formatDate(score.date)}</li>
                            ))}
                        </ul>
                    </div>
                </Stack>
            </Item>
        </div>
    );
};

export default InfosProfil;