const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { connectDb } = require('./db');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.session = req.cookies.jwtauth;
    next();
});

connectDb();

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use('/api', authRoutes);
app.use('/api/movies', movieRoutes);

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server started on port ${port}...`));