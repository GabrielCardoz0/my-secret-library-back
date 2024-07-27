import { z } from "zod";

export const userCredentialsSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const userSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
});