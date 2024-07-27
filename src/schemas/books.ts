import { z } from "zod";

export const newBookSchema = z.object({
    name: z.string(),
    synopsis: z.string(),
    gender: z.string(),
    author: z.string(),
    rating: z.number(),
    is_read: z.boolean(),
    serie_name: z.string().optional(),
    img_url: z.string().optional(),
});

export interface Book {
    id: number;
    name: string;
    synopsis: string;
    gender: string;
    author: string;
    rating: number;
    serie_name: string;
    is_read: boolean;
    img_url: string;
    user_id: number;
    created_at: Date;
    updated_at: Date;
};

export interface NewBook extends Omit<Book, 'id' | 'created_at' | 'updated_at' | "user_id"> {
};
