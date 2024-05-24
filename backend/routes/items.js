const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const router = express.Router();

const itemsCtrl = require('../controllers/items');

router.post('/', multer, itemsCtrl.createProduct);
router.put('/:id', multer, itemsCtrl.modifyProduct);
router.delete('/:id', itemsCtrl.deleteProduct);
router.get('/:id', itemsCtrl.getOneProduct);
router.get('/', itemsCtrl.getAllProduct);

module.exports = router;