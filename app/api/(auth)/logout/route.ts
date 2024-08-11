import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import User from "@/models/userModel";

export async function DELETE(req: Request) {
    try {
        const cookie = cookies().get('token')?.value;
        if(!cookie) { 
            return Response.json({
                success: false,
                message: "Token is missing"
            }, { status:403 })
        }
        //decode the token
        const decoded = jwt.verify(cookie, process.env.JWT_SECRET as string);
        console.log("Decoded", decoded);
        cookies().delete('token')
        return Response.json({
            decoded,
            message: "User has been Logout sucessfully",
            success: false
        }, { status: 201 })
    } catch (error) {
        console.log(error);
        return Response.json({
            message: `Internal Server Error`,
            success: false
        }, { status: 500 })
    }
}