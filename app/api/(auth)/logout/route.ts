import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function DELETE(req: Request) {
    try {
        const Cookie = cookies().get('token');
        const token = Cookie ? Cookie.value : undefined;
        if(!token) { 
            return Response.json({
                success: false,
                message: "Token is missing"
            }, { status:403 })
        }
        //decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log("Decoded", decoded);
    
        return Response.json({
            decoded,
            message: "User has been Logout sucessfully",
            success: false
        }, { status: 401 })
    } catch (error) {
        console.log(error);
        return Response.json({
            message: `Internal Server Error`,
            success: false
        }, { status: 500 })
    }
}