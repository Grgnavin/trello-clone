import dbConnect from "@/app/lib/dbConnect";
import User, { ROLE } from "@/models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

type userDetails = {
    email: string;
    password: string;
} | null

export async function POST(req: Request, res: Response){
    try {
        const { email, password } = await req.body();
        await dbConnect();
        const checkUsername = await User.findOne({ email }) as userDetails;
        if (!checkUsername) {
            return res.json({
                sucess: false,
                message: "User not loggedIn..."
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, checkUsername.password);
        if (!isPasswordMatch) {
            return res.json({
                sucess: false,
                message: "Incorrect Password"
            });
        }

        const user = await User.findOne({ email }).select('-password');

        return res.json({
            data: user,
            message: `Sucessfully loggedIn as ${user?.username}`,
            success: true
        })

    } catch (error) {
        console.log("Error signing up user", error);    
        return res.json({
            success: false,
            message: `Error signing up user: ${error.message}`
        })
    }
}