import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { Variables } from "hono/types";
import booksModels from "../models/books";

async function getBooks(c: Context<Variables>) {
    try {
        const { page, limit } = await c.req.json();

        return c.json({ page, limit });

        // const books = await booksModels.getBooks(page, limit);

        // return c.json(books);

    } catch (error: any) {
        if(error instanceof HTTPException) throw error;

        throw new HTTPException(500, { message: "Internal server error" });
    };
};

const booksController = {
    getBooks,
};

export default booksController;