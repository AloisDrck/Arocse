import React from 'react';
import Header from '../Components/Header';
import ProductInCart from '../Components/ProductInCart';

const Cart = () => {
    return (
        <div>
            <Header />
            <div style={{ marginTop: '100px' }}><h1>Votre Panier</h1></div>
            <ProductInCart />
        </div>
    );
};

export default Cart;