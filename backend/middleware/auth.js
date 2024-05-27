const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const auth = req.cookies.accessToken;

    if (auth == null) return res.status(401).json({ message: 'No token, authorization denied' }); // Correction ici

    jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' }); // Correction ici
        req.user = user;
        next();
    });
};

module.exports = auth;
