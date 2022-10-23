const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mailgun = require("mailgun-js");
const db = require("../db");
const DOMAIN = 'sandbox1ac1d9d6a9944b59a451cc69cb99b7bf.mailgun.org';
const mg = mailgun({
    apiKey:
        'e27b9543e7e234f80b13d0e7622e816d-2af183ba-7d489d6f',
    // process.env.MAILGUN_API_KEY,
    domain: DOMAIN
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = async role => {
    return jwt.sign({ role }, process.env.JWT_SECRET_KEY, {
        expiresIn: maxAge
    });
};

module.exports.home_get = (req, res) => {
    res.render('home');
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('signin');
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUserExistQuery = `SELECT * FROM users WHERE users.email = '${email}' LIMIT 1`;
        const user = await db.query(isUserExistQuery);
        if (user.rowCount === 0) {
            return res.status(404).json({
                error: 'User not found!'
            });
        }
        const passwordFromdb = user.rows[0].password;
        const passwordCheck = await bcrypt.compare(password, passwordFromdb);
        if (!passwordCheck) {
            return res.status(404).json({
                error: 'Passwords did not match!!'
            });
        }
        const token = await createToken(user.email);
        res.cookie('jwtauth', token, { httpOnly: true, maxAge: maxAge * 1000 });
        return res.status(200).json({ user: user.rows[0], result: 'Success', url: `${process.env.WEB_URL}/api/movies` });
    }
    catch (err) {
        return res.status(400).json({ err: err.message });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwtauth', '', { maxAge: 1 });
    res.redirect('/api');
}

module.exports.activateAccount = async (req, res) => {
    const token = req.params.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/api/signup');
            } else {
                let { email, password } = decodedToken;
                const salt = await bcrypt.genSalt();
                password = await bcrypt.hash(password, salt);
                const sql = 'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *';
                const newUser = await db.query(sql, [email, password]);
                console.log(newUser);
                // now login this user
                const token = await createToken(newUser.email);
                res.cookie('jwtauth', token, { httpOnly: true, maxAge: maxAge * 1000 });
                return res.redirect('/api/movies');
            }
        });
    } else {
        return res.redirect('/api/signup');
    }
}