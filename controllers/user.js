const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Cart = require('../models/Cart');
require('dotenv').config();

// Enregistrement
exports.register = [
    body('name').notEmpty().withMessage('Prénom est requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe doit contenir au moins 6 caractères'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    (req, res) => {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });

                const refreshToken = jwt.sign(
                    { userId: user._id },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '7d' }
                );

                user.refreshToken = refreshToken;

                // Créez un nouveau panier associé à cet utilisateur
                const cart = new Cart({
                    user: user._id,
                    products: []
                });

                // Enregistrez le nouvel utilisateur et son panier
                Promise.all([user.save(), cart.save()])
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => (console.log("oula"), res.status(500).json({ error })));
    }
];

// Connexion
exports.signin = [
    body('email').isEmail().withMessage('Email invalide'),
    body('password').notEmpty().withMessage('Mot de passe requis'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                }

                bcrypt.compare(req.body.password, user.password)
                    .then(async valid => {
                        if (!valid) {
                            return res.status(401).json({ error: 'Mot de passe incorrect !' });
                        } else {
                            console.log(user);
                            const accessToken = jwt.sign(
                                { userId: user._id },
                                process.env.ACCESS_TOKEN_SECRET,
                                { expiresIn: '15m' }
                            );
                            const refreshToken = jwt.sign(
                                { userId: user._id },
                                process.env.REFRESH_TOKEN_SECRET,
                                { expiresIn: '7d' }
                            );


                            res.cookie('accessToken', accessToken, {
                                secure: false,
                                httpOnly: true,
                                sameSite: 'lax',
                            });
                            res.cookie('refreshToken', refreshToken, {
                                secure: false,
                                httpOnly: true,
                                sameSite: 'lax',
                            });

                            res.status(200).json({
                                userId: user._id,
                                // accessToken: accessToken, // Include the access token in the response body
                                message: 'Authentification réussie!'
                            });
                            return;
                        }
                    })
                    .catch(error => res.status(500).json({ "m": error }));
            })
            .catch(error => res.status(500).json({ "m": "pas trouve utilisateur" }));
    }
];

// Récupération des informations utilisateur
exports.getUserInfo = (req, res) => {

    User.findById(req.user.userId)
        .then(userT => {
            if (!userT) {
                return res.status(404).json({ error: 'Utilisateur non trouvé!' });
            }
            console.log(userT);
            res.status(200).json({
                name: userT.name,
                email: userT.email,
                refreshToken: userT.refreshToken
            });

        })
        .catch(error => res.status(500).json({ error }));
};

// Récupération de l'utilisateur courant
exports.getCurrentUser = (req, res) => {
    User.findById(req.user.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.json({ id: user._id, name: user.name, email: user.email });
        })
        .catch(error => res.status(500).json({ message: 'Erreur serveur' }));
};

// Rafraîchir le token
exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(refreshToken, 'RANDOM_REFRESH-TOKEN_SECRET');
        const accessToken = jwt.sign(
            { userId: decoded.userId },
            'RANDOM_ACCESS-TOKEN_SECRET',
            { expiresIn: '15m' }
        );

        res.cookie('accessToken', accessToken, {
            secure: false,
            httpOnly: true,
            sameSite: 'lax',
        });

        res.status(200).json({ message: 'Access token refreshed' });
    } catch (err) {
        res.status(403).json({ message: 'Invalid refresh token' });
    }
};

// Déconnexion
exports.logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Déconnexion réussie!' });
    console.log("deconnexion réussie");
};