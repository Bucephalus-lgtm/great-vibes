const express = require('express');
const { movie_get } = require('../controller/movies.js');
const router = express.Router();

const MovieController = require('../controller/movies.js');
const { requireAuth } = require('../middleware/auth.js');

router.get('/', requireAuth, movie_get);
router.get('/add-movie', requireAuth, MovieController.add_movie_get);
router.get('/update-movie/:movieId', requireAuth, MovieController.update_movie_get);

router.get('/list', MovieController.get_all_movies);
router.get('/list/:id', MovieController.get_movie_by_id);
router.post('/list', MovieController.create_movie);
router.put('/list/:id', MovieController.update_movie);
router.delete('/list/:id', MovieController.delete_movie);

module.exports = router;