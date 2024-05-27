import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, ImageList, ImageListItem, Button, styled } from '@mui/material';
import ArrowBack from '../Components/ArrowBack';
import theme from '../styles/theme';
import axios from 'axios';
import CartButton from '../Components/CartButton';

const ProductDetails = () => {
    const { state } = useLocation();
    const { product } = state;
    const [addedToCart, setAddedToCart] = useState(false);

    const AddButton = styled(Button)(({ theme }) => ({
        backgroundColor: theme.palette.color3.main
    }));

    const addToCart = async () => {
        try {
            await axios.post('http://localhost:3000/api/cart', { productId: product._id, quantity: 1 }, { withCredentials: true });
            setAddedToCart(true);
        } catch (error) {
            console.error('Erreur lors de l\'ajout au panier:', error);
        }
    };

    return (
        <div>
            <ArrowBack />
            <CartButton />
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: '30px' }}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ maxWidth: 1000, margin: 'auto', alignItems: 'center' }}>
                        <CardContent>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <ImageList sx={{ width: 800, height: 600 }}
                                    variant="quilted"
                                    cols={4}
                                    rowHeight={296}>
                                    {product.images.map((image, index) => (
                                        <ImageListItem key={index} cols={2} >
                                            <img
                                                src={`${image}?w=248&fit=crop&auto=format`}
                                                srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                alt={`image ${index + 1} de ${product.titre}`}
                                                loading="lazy"
                                                style={{ borderRadius: '20px' }}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            </div>
                            <Grid container alignItems="center" spacing={2} style={{ marginTop: '20px' }}>
                                <Grid item xs={8} style={{ paddingLeft: '60px' }}>
                                    <Typography gutterBottom variant="h4" component="div">
                                        {product.titre}
                                    </Typography>
                                    <Typography variant="h5" color="text.secondary">
                                        {product.prix + '.-'}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" style={{ marginTop: '20px' }}>
                                        {product.description}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} container justifyContent="flex-end" style={{ paddingRight: '40px' }}>
                                    <AddButton
                                        theme={theme}
                                        variant="contained"
                                        onClick={addToCart} // Ajoutez cette ligne pour appeler addToCart lors du clic sur le bouton
                                        disabled={addedToCart} // Désactivez le bouton si le produit a déjà été ajouté au panier
                                    >
                                        Ajouter au panier
                                    </AddButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div >
    );
};

export default ProductDetails;

