import { Context } from "hono";
import { Variables } from "hono/types";
import authModels from "../models/auth";
import { HTTPException } from "hono/http-exception";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";

const { JWT_SECRET } = process.env;

async function signIn(c: Context<Variables>) {
    try {
        const { username, password } = await c.req.json();

        const user = await authModels.getUserByUsernema(username);

        if(!user) throw new HTTPException(404, { message: "User not found" });
        
        const passwordVerify = bcrypt.compareSync(password, user.password);

        if(!passwordVerify) throw new HTTPException(401, { message: "Invalid password" });

        const token = await sign({ id: user.id }, JWT_SECRET!);

        return c.json({ token });

    } catch (error: any) {
        if(error instanceof HTTPException) throw error;

        throw new HTTPException(500, { message: "Internal server error" });
    };
};

const authController = {
    signIn,
};

export default authController;