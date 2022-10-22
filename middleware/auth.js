const jwt = require('jsonwebtoken');

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwtauth;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.redirect('/api/signin');
            }
            next();
        });
    } else {
        res.redirect('/api/signin');
    }
}   