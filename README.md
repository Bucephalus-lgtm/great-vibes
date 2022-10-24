<h1 align="center">
🌐	Movie CRUD App
</h1>
<p align="center">
PostgreSQL, Expressjs, Nodejs
</p>

## Clone or Download

```terminal
$ git clone https://github.com/Bucephalus-lgtm/great-vibes
$ npm i
```

## Project Structure

```terminal
	/controllers
	/db
	/middleware
	/public
	/routes
	/views
	package.json
	server.js
```

# Usage (run the app app on your machine)

## Prerequisites

- [PostgreSQL](https://www.postgresql.org/download)
- [Node](https://nodejs.org/en/download) ^14.0.0
- [npm](https://nodejs.org/en/download/package-manager)

## Webapp usage(PORT: 8000)

### Prepare your secret

(You will have to put values for all the variables mentioned in the .env.example file).

### Database Setup

```terminal
In your local postgresql database client(e.g, pgAdmin 4), run the following commands to get the database up and run for use:
$ CREATE DATABASE movies_db;
$ CREATE TABLE movies( id BIGSERIAL NOT NULL PRIMARY KEY, movie_name VARCHAR(255) NOT NULL, rating INT NOT NULL, movie_cast TEXT[] NOT NULL,  genre VARCHAR(255) NOT NULL, release_date DATE);
$ CREATE TABLE users( id BIGSERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL);
```

### Start

```terminal
in the root level,
$ npm i       // npm install packages
$ npm run dev // run it locally
```

# Dependencies(tech-stacks)

"bcrypt": "^5.0.0", | "cookie-parser": "^1.4.5", | dotenv": "^8.6.0" | "ejs": "^3.1.5"
"express": "^4.17.1" | "jsonwebtoken": "^8.5.1" | "mailgun-js": "^0.6.7" |
 "mongodb": "^3.6.3" | "mongoose": "^5.10.14" | "nodemailer": "^6.4.16" | "pg": "^8.8.0"

## Author

[Bhargab Nath](https://github.com/Bucephalus-lgtm)

I am a passionate software developer with hands on experience on Nodejs based web development.
