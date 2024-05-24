const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const auth = req.cookies.accessToken;

    if (auth == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(auth, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = auth;
