import { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { Variables } from "hono/types";
import booksModels from "../models/books";
import { decode } from 'hono/jwt'
import { NewBook } from "../schemas/books";


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
        console.log(error);
        
        if(error instanceof HTTPException) throw error;

        throw new HTTPException(500, { message: "Internal server error" });
    };
};

async function creteBook(c: Context<Variables>) {
    try {
        const token = c.req.header('Authorization')!.replace("Bearer ", "");
        const  { id }  = decode(token).payload;
        
        const userId = Number(id);
        
        const newBook: NewBook = await c.req.json();
        
        await booksModels.createBook(newBook, userId);
        
        return c.json({ message: "Book created!" }, 201);

    } catch (error: any) {
        console.log(error);
        
        if(error instanceof HTTPException) throw error;

        throw new HTTPException(500, { message: "Internal server error" });
    };
};

const booksController = {
    getBooks,
    creteBook,
};

export default booksController;