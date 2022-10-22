const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const db = require('../db');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    const isUserExistQuery = `SELECT * FROM users WHERE users.email = '${email}' LIMIT 1`;
    const isUserExist = await db.query(isUserExistQuery);
    if (isUserExist.rowCount) {
        return res.status(400).json({
            error: 'This email id is already registered!!!'
        });
    }
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
    const activationUrl = `http://localhost:8000/api/authentication/activate/${token}`;
    const mailOptions = {
        from: 'bhargabnath691@gmail.com',
        to: email,
        subject: 'Verify your email',
        html:
            `<h3>Please <a href="">click</a> here to activate your account.
                        `,
        html: `
                        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Great Vibes</h2>
                        <p>Thank you for signing up to Great Vibes' website. Click the button below to activate your account</p>
                        <a href=${activationUrl} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify Email</a>
                    
                        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                    
                        <div>${activationUrl}</div>
                        </div>
                    `
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}