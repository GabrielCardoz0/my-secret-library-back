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


export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
};
export interface NewUser extends Omit<User, 'id'> {
};