import { QueryResult } from "pg";
import db from "../config/database";
import { NewBook } from "../schemas/books";

async function getBooks(userId: number, limit: number = 10, offset: number = 0 ) {
    const { rows } = await db.query("SELECT * FROM books WHERE user_id = $1 LIMIT $2 OFFSET $3", [userId, limit, offset]);
    return rows;
};

async function getBooksCount(userId: number) {
    const { rows } = await db.query("SELECT COUNT(*) FROM books WHERE user_id = $1", [userId]);
    return rows[0].count;
};

async function createBook(newBook: NewBook, userId: number): Promise<QueryResult> {
    const { name, synopsis, gender, author, serie_name, rating, is_read, img_url } = newBook;

    return await db.query(`
        INSERT INTO
            books(name, synopsis, gender, author, serie_name, rating, is_read, img_url, user_id)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
    [name, synopsis, gender, author, serie_name, rating, is_read, img_url, userId]);
};

const booksModels = {
    getBooks,
    getBooksCount,
    createBook,
};

export default booksModels;