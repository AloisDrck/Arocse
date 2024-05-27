const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/register', userCtrl.register);
router.post('/signin', userCtrl.signin);
router.get('/', auth, userCtrl.getUserInfo);
router.get('/current', auth, userCtrl.getCurrentUser);
router.post('/refresh-token', userCtrl.refreshToken);
router.post('/logout', auth, userCtrl.logout);

module.exports = router;
