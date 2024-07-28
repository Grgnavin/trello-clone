import dbConnect from "@/app/lib/dbConnect";
import User, { ROLE } from "@/models/userModel";
import { Request } from "express";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

type userDetails = {
    email: string;
    username: string;
    password: string;
    role: ROLE
}

export async function POST(req: Request){
    try {
        const { email, password, username } =await req.json();
        console.log('Received data:', { email, password, username });
        if (!email || !password || !username) {
            return Response.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }
        await dbConnect();

        const checkUsername = await User.findOne({ email });
        if (checkUsername) {
            return Response.json({
                sucess: false,
                message: "User already exists"
            }, { status: 400 });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            username,
            password: hashPassword,
            role: ROLE.USER
        })
        await user.save({ validateBeforeSave: true })
        return Response.json({
            user,
            message: "User created successfully",
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