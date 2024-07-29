import { QueryResult } from "pg";
import db from "../config/database";
import { NewUser } from "../schemas/auth";

async function getUserByUsername(username: string) {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0];
};

async function createUser({ name, username, password }: NewUser): Promise<QueryResult> {
    return await db.query(`
        INSERT INTO users(name, username, password)
        VALUES($1, $2, $3)
    ;`, [name, username, password]);
};

const authModels = {
    getUserByUsername,
    createUser,
};

export default authModels;