import db from "../config/database";

async function getUserByUsernema(username: string) {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0];
};

const authModels = {
    getUserByUsernema,
};

export default authModels;