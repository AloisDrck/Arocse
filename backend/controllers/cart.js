const Cart = require('../models/Cart');

// Méthode pour récupérer le panier d'un utilisateur
exports.getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.userId; // Identifiant de l'utilisateur
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Méthode pour ajouter un produit au panier d'un utilisateur
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        console.log("userId : ", userId);
        const { productId, quantity } = req.body; // Données du produit à ajouter
        console.log("product quantity : ", productId, quantity);
        const cart = await Cart.findOneAndUpdate(
            { user: userId }, // Trouver le panier de l'utilisateur
            { $push: { products: { product: productId, quantity: quantity } } }, // Ajouter le produit au panier
            { new: true, upsert: true } // Options pour créer le panier s'il n'existe pas
        );
        console.log("Produit ajouté au panier");
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Méthode pour supprimer un produit du panier d'un utilisateur
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.body; // Identifiant du produit à supprimer

        const cart = await Cart.findOneAndUpdate(
            { user: userId }, // Trouver le panier de l'utilisateur
            { $pull: { products: { product: productId } } }, // Supprimer le produit du panier
            { new: true } // Retourner le document mis à jour
        );

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        console.log("Produit supprimé du panier");
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'Server error' });
    }
};