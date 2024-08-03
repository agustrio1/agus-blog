import { prisma } from "@/prisma/prisma";
import { UserType } from "@/types/userType";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const body: UserType = await request.json();

        const hashedPassword = await argon2.hash(body.password);

        const emailAdmin = process.env.EMAIL_ADMIN;
        let role = emailAdmin === body.email ? "admin" : "viewer";
        const user = await prisma.user.create({
            data: {
                name: body.name as string,
                email: body.email,
                password: hashedPassword,
                role: role as "admin" | "author" | "reviewer" | "viewer",
            },
        });
        const token = jwt.sign(
            {
                email: user.email,
                id: user.id,
                name: user.name,
                role: user.role,
            },
            process.env.JWT_SECRET as string
        );

        return new Response(JSON.stringify({ token }), { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return new Response(JSON.stringify({ error: 'Registration failed' }), { status: 500 });
    }
}