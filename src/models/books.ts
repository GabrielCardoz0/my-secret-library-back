import db from "../config/database";

async function getBooks(userId: number, limit: number = 10, offset: number = 0 ) {
    const { rows } = await db.query("SELECT * FROM books WHERE user_id = $1 LIMIT $2 OFFSET $3", [userId, limit, offset]);
    return rows;
};

async function getBooksCount(userId: number) {
    const { rows } = await db.query("SELECT COUNT(*) FROM books WHERE user_id = $1", [userId]);
    return rows[0].count;
}

const booksModels = {
    getBooks,
    getBooksCount,
};

export default booksModels;