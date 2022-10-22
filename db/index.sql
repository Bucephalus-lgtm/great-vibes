-- for any help \?
-- for listing all databases \l
-- for connecting to one database \c <__DB_NAME__>
-- for viewing details of TABLE of a database \d <__TABLE_NAME__>

-- CREATE DATABASE __your_db_name__

CREATE DATABASE movies_db;

CREATE TABLE movies( id BIGSERIAL NOT NULL PRIMARY KEY, movie_name VARCHAR(255) NOT NULL, rating INT NOT NULL, movie_cast TEXT[] NOT NULL,  genre VARCHAR(255) NOT NULL, release_date DATE);

INSERT INTO movies(movie_name, rating, movie_cast, genre, release_date) VALUES ('Titanic', 8.5, '{"Leonardo DiCarpio"}', 'romantic','1997-11-11');

SELECT  * FROM movies;

CREATE TABLE users( id BIGSERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);

INSERT INTO users(email, password) VALUES ('bhargabnath691@gmail.com', 'password');

SELECT * FROM users;