const env = require('dotenv');
const { Pool } = require('pg');

env.config();

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: Number(DB_PORT)
});

const createDb = async () => {
    console.log('Creating tables...');

    try {
        await pool.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL);
        `);

        await pool.query(`
            CREATE TABLE books (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                synopsis TEXT,
                gender VARCHAR(100),
                author VARCHAR(255),
                serie_name VARCHAR(255),
                rating INTEGER NOT NULL DEFAULT 0,
                is_read BOOLEAN NOT NULL DEFAULT false,
                img_url VARCHAR(255),
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
        console.log('Tables created successfully!');

        await pool.query(`
            INSERT INTO users(name, username, password)
            VALUES($1, $2, $3)
        ;`, ["Gabriel Cardozo", "gabriel", "$2b$10$ErkyehK3k0WUgglYh8NXB.9C6ke6szwglJXLK5bQ6BTN5Rs/qAi2G"]);

        console.log("User 'gabriel' created successfully!");
        
    } catch (error) {
        console.error(error);
    }
    finally {
        pool.end();
    }
}

createDb();