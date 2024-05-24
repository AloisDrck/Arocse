import { HomeTwoTone } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';

const ArrowBack = () => {

    const navigate = useNavigate();

    const CircularButton = styled(IconButton)(({ theme }) => ({
        position: 'absolute',
        top: 25,
        left: 25,
        color: theme.palette.color3.main,
        height: '50px',
        width: '50px'
    }));

    return (
        <div>
            <CircularButton onClick={() => navigate('/Home')} theme={theme}>
                <HomeTwoTone sx={{ fontSize: '2rem' }} />
            </CircularButton>
        </div>
    );
};

export default ArrowBack;