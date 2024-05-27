import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
import { Box, Button, ButtonBase, Grid, IconButton, Paper, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import theme from '../styles/theme';
import { Delete, ShoppingCart } from '@mui/icons-material';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate(); // Pour la redirection

    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/cart', { withCredentials: true });
            console.log(response);
            setCart(response.data.products);
        } catch (error) {
            console.error('Erreur lors de la récupération du panier :', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const removeFromCart = async (productId) => {
        try {
            await axios.post(
                'http://localhost:3000/api/cart/remove',
                { productId },
                { withCredentials: true }
            );
            // Rappeler fetchCart pour mettre à jour l'état du panier
            fetchCart();
        } catch (error) {
            console.error('Erreur lors de la suppression du produit du panier :', error);
        }
    };

    const handleCardClick = (product) => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    const CartButton = styled(Button)(({ theme }) => ({
        backgroundColor: theme.palette.color1.main,
        '&:hover': {
            backgroundColor: theme.palette.color2.main,
        },
    }));

    return (
        <div>
            <Header />
            <div>
                <Grid container spacing={2} style={{ marginTop: '100px' }}>
                    <Grid item xs={8}>
                        {cart.map((product, index) => (
                            <Paper
                                sx={{
                                    p: 2,
                                    margin: 'auto',
                                    maxWidth: 650,
                                    flexGrow: 1,
                                    marginBottom: '30px',
                                }}
                                key={index}
                            >
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase sx={{ width: 128, height: 128 }} onClick={() => handleCardClick(product.product)}>
                                            <Img alt={'image de ' + product.product.titre} src={product.product.images[0]} />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    {product.product.titre}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {product.product.description}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Catégorie : {product.product.categorie}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <IconButton onClick={() => removeFromCart(product.product._id)}>
                                                    <Delete />
                                                </IconButton>

                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" component="div">
                                                {product.product.prix}.-
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item xs={4}>
                        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 400, }}>
                            <Typography variant="h5" component="div" sx={{ marginBottom: 3, marginTop: 2 }}>
                                Votre Panier
                            </Typography>
                            {cart.map((product, index) => (
                                <Box display="flex" justifyContent="space-between" key={index}>
                                    <Typography component="span" variant="body2" color="text.secondary" >{product.product.titre}</Typography>
                                    <Typography component="span" variant="body2" color="text.secondary" >{product.product.prix}.-</Typography>
                                </Box>
                            ))}
                            <Box display="flex" justifyContent="space-between">
                                <Typography variant="h6" component="div" sx={{ marginBottom: 1, marginTop: 1 }}>
                                    Total
                                </Typography>
                                <Typography variant="h6" component="div" sx={{ marginBottom: 1, marginTop: 1 }}>
                                    {cart.reduce((total, product) => total + product.product.prix, 0)}.-
                                </Typography>
                            </Box>
                            <CartButton variant="contained" theme={theme} endIcon={<ShoppingCart />} sx={{ marginTop: 2 }}>
                                Commander
                            </CartButton>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div >
    );
};

export default Cart;