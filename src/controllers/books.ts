import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { Variables } from "hono/types";
import booksModels from "../models/books";
import { decode } from 'hono/jwt'


async function getBooks(c: Context<Variables>) {
    try {
        const token = c.req.header('Authorization')!.replace("Bearer ", "");
        const  { id }  = decode(token).payload;

        const userId = Number(id);

        const [page, limit] = [c.req.query("page"), c.req.query("limit")];

        const offset = (Number(page ?? 1) - 1) * Number(limit ?? 0);

        const books = await booksModels.getBooks(userId, Number(limit), offset);
        const booksCount = await booksModels.getBooksCount(userId);

        return c.json({ books, count: Number(booksCount) });

    } catch (error: any) {
        if(error instanceof HTTPException) throw error;

        throw new HTTPException(500, { message: "Internal server error" });
    };
};

const booksController = {
    getBooks,
};

export default booksController;