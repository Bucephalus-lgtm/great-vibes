const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.session = req.cookies.jwtauth;
    next();
});

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// app.get('*', checkUser);
// app.get('/', (req, res) => res.render('home'));
// app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use('/api', authRoutes);
app.use('/api/movies', movieRoutes);

app.listen(8000, console.log('Server started on port 8000...'));