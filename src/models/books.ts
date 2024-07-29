import { QueryResult } from "pg";
import db from "../config/database";
import { NewBook } from "../schemas/books";

async function getBooks(userId: number, limit: number = 10, offset: number = 0, search: string = "") {
    const { rows } = await db.query("SELECT * FROM books WHERE user_id = $1 AND name LIKE $4 ORDER BY id DESC LIMIT $2 OFFSET $3", [userId, limit, offset, `%${search}%`]);
    return rows;
};

async function getBooksCount(userId: number) {
    const { rows } = await db.query("SELECT COUNT(*) FROM books WHERE user_id = $1", [userId]);
    return rows[0].count;
};

async function createBook(newBook: NewBook, userId: number): Promise<QueryResult> {
    const { name, synopsis, gender, author, serie_name, rating, is_read, img_url } = newBook;

    return await db.query(`
        INSERT INTO books(name, synopsis, gender, author, serie_name, rating, is_read, img_url, user_id)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ;`, [name, synopsis, gender, author, serie_name, rating, is_read, img_url, userId]);
};

async function getBookById(bookId: number, userId: number) {
    const { rows } = await db.query("SELECT * FROM books WHERE id = $1 AND user_id = $2", [bookId, userId]);
    return rows[0];
};

async function updateBookById(updatedBook: NewBook, bookId: number ) {
    const { name, synopsis, gender, author, serie_name, rating, is_read, img_url } = updatedBook;
    return db.query(`
        UPDATE books
        SET name = $1, synopsis = $2, gender = $3, author = $4, serie_name = $5, rating = $6, is_read = $7, img_url = $8
        WHERE id = $9
    ;`, [name, synopsis, gender, author, serie_name, rating, is_read, img_url, bookId]);
};

async function deleteBookById(bookId: number) {
    return db.query(`
        DELETE FROM books
        WHERE id = $1
    ;`, [bookId]);
};

const booksModels = {
    getBooks,
    getBooksCount,
    createBook,
    getBookById,
    updateBookById,
    deleteBookById,
};

export default booksModels;