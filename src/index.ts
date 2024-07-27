import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import db from './config/database';
const app = new Hono();

app
.get('/', async (c) => {
  try {
    await db.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3);', ['Gabriel', 'Gabriel', '123456']);


    const { rows } = await db.query('SELECT * FROM users');

    console.log(rows);

    return c.json({ message: 'Conexão com o database estabelecida' });
    
  } catch (error: any) {
    return c.json({ error }, 400);
  }
});

const port = 4000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
