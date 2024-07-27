import db from "../config/database";

async function getBooks(userId: number, limit: number = 10, offset: number = 0 ) {
    const { rows } = await db.query("SELECT * FROM books WHERE user_id = $1 LIMIT $2 OFFSET $3", [userId, limit, offset]);
    return rows;
};

const booksModels = {
    getBooks,
};

export default booksModels;