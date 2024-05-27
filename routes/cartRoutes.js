const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const cartCtrl = require('../controllers/cart');

router.post('/', auth, cartCtrl.addToCart);
router.get('/', auth, cartCtrl.getCartByUserId);
router.post('/remove', auth, cartCtrl.removeFromCart);

module.exports = router;