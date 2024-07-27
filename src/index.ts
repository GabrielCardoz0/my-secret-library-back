import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { jwt, JwtVariables } from 'hono/jwt';
import env from 'dotenv';
import { zValidator } from '@hono/zod-validator';
import { userCredentialsSchema } from './schemas/auth';
import authController from './controllers/auth';
import booksController from './controllers/books';
import { newBookSchema } from './schemas/books';
import { bearerAuth } from 'hono/bearer-auth';


type Variables = JwtVariables


env.config();

const { PORT, JWT_SECRET } = process.env;

const app = new Hono<{ Variables: Variables }>()

app
  .post('/auth', zValidator("json", userCredentialsSchema), authController.signIn)
  .use('/books/*', jwt({ secret: JWT_SECRET! }))
  .get('/books', booksController.getBooks)
  .post('/books', zValidator("json", newBookSchema), booksController.creteBook)
  .get('/books/:bookId', booksController.getBookById)
  .put('/books/:bookId', zValidator("json", newBookSchema), booksController.updateBook)
  .delete('/books/:bookId', booksController.deleteBook)

console.log(`Server is running on port ${PORT}`);

serve({
  fetch: app.fetch,
  port: Number(PORT!),
});
