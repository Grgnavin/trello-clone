import dbConnect from "@/lib/dbConnect";
import User, { ROLE } from "@/models/userModel";
import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

type userDetails = {
    email: string;
    password: string;
} | null

export async function POST(req: Request, res: Response){
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return Response.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }

        await dbConnect();
        const checkUsername = await User.findOne({ email });
        if (!checkUsername) {
            return Response.json({
                sucess: false,
                message: "Incorrect Credentials"
            }, { status: 400 });
        }
        const token = jwt.sign({user: checkUsername} , process.env.JWT_SECRET as string, { expiresIn: '1d' });
        const isPasswordMatch = await bcrypt.compare(password, checkUsername.password);
        if (!isPasswordMatch) {
            return Response.json({
                sucess: false,
                message: "Incorrect Password"
            }, { status: 403 });
        }

        const user = await User.findOne({ email }).select('-password');
        const oneDay = 24 * 60 * 60 * 1000
        cookies().set('token', token, { 
            maxAge: Date.now() - oneDay, 
            secure: true
        });
        return Response.json({
            data: user,
            message: `Sucessfully loggedIn as ${user?.username}`,
            success: true
        }, { status: 200 })

    } catch (error) {
        console.log("Error signing up user", error);    
        return Response.json({
            success: false,
            message: `Error signing up user: ${error.message}`
        }, { status: 500 })
    }
}