const db = require('../db');

module.exports.movie_get = async (req, res) => {
    const sql = 'select * from movies';
    const movies = await db.query(sql);
    // console.log({ res: movies.rows });
    return res.render('movies', { movies: movies.rows });
}

module.exports.add_movie_get = async (req, res) => {
    return res.render('add-movie');
}

module.exports.update_movie_get = async (req, res) => {
    const id = req.params.movieId;
    const isFoundQuery = `SELECT * FROM movies WHERE id = ${id}`;
    const isFoundMovie = await db.query(isFoundQuery);
    const movie = isFoundMovie.rows[0];
    return res.render('update-movie',
        {
            movie,
            release_date: ("0" + movie.release_date.getDate()).slice(-2) + "-" + ("0" + (movie.release_date.getMonth() + 1)).slice(-2) + "-" +
                movie.release_date.getFullYear()
        }
    );
}

exports.get_all_movies = async (req, res) => {
    try {
        const sql = 'select * from movies';
        const movies = await db.query(sql);
        console.log({ res: movies.rows });
        return res.json({
            results: movies.rows.length,
            status: 'success',
            data: {
                movies: movies.rows
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.get_movie_by_id = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'select * from movies WHERE id = $1';
        const movie = await db.query(sql, [id]);
        return res.json({
            data: {
                status: 'success',
                movie: movie.rows
            }
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.create_movie = async (req, res) => {
    try {
        const { movie_name, rating, movie_cast, genre, release_date } = req.body;
        const sql = 'INSERT INTO movies(movie_name, rating, movie_cast, genre, release_date) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const movie = await db.query(sql, [movie_name, rating, movie_cast, genre, release_date]);
        return res.json({
            movie: movie.rows,
            result: 'Success',
            url: `${process.env.WEB_URL}/api/movies`
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.update_movie = async (req, res) => {
    try {
        const id = req.params.id;
        const { movie_name, rating, movie_cast, genre, release_date } = req.body;
        const sql = 'UPDATE movies SET movie_name = $1, rating = $2, movie_cast = $3, genre = $4, release_date = $5 WHERE id = $6 RETURNING *';
        const movie = await db.query(sql, [movie_name, rating, movie_cast, genre, release_date, id]);
        return res.json({
            movie: movie.rows,
            result: 'Success',
            url: `${process.env.WEB_URL}/api/movies`
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}

exports.delete_movie = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = 'DELETE FROM movies WHERE id = $1';
        await db.query(sql, [id]);
        return res.json({
            result: 'Success',
            url: `${process.env.WEB_URL}/api/movies`
        });
    } catch (err) {
        console.log(err.message);
        return res.json({ message: err.message });
    }
}