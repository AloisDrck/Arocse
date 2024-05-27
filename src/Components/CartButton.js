import { IconButton, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import { Cart } from 'mdi-material-ui';

const CartButton = () => {

    const navigate = useNavigate();

    const CircularButton = styled(IconButton)(({ theme }) => ({
        position: 'absolute',
        top: 25,
        right: 25,
        color: theme.palette.color3.main,
        height: '50px',
        width: '50px'
    }));

    return (
        <div>
            <CircularButton onClick={() => navigate('/Cart')} theme={theme}>
                <Cart sx={{ fontSize: '2rem' }} />
            </CircularButton>
        </div>
    );
};

export default CartButton;