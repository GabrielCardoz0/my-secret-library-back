import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { JwtVariables } from 'hono/jwt';
import env from 'dotenv';
import { zValidator } from '@hono/zod-validator';
import { userCredentialsSchema } from './schemas/auth';
import authController from './controllers/auth';


type Variables = JwtVariables


env.config();

const { PORT } = process.env;

const app = new Hono<{ Variables: Variables }>()

app
.post('/auth', zValidator("json", userCredentialsSchema), authController.signIn);

console.log(`Server is running on port ${PORT}`);

serve({
  fetch: app.fetch,
  port: Number(PORT!),
});
