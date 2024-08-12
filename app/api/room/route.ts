import  jwt  from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from "@/lib/dbConnect";
import Room from "@/models/roomModel";

interface Room extends Document{
    name: string,
    description: string,
    user: any,
    task: [],
};

export async function POST(req: Request): Promise<any>{
        const { name, description, code } = await req.json();

        await dbConnect();
        if (!name || !description) {
            return Response.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }
    try {
        const tokenCookie = cookies().get('token');
        const token = tokenCookie ? tokenCookie.value : undefined;
        
        if(!token) { 
            return Response.json({
                success: false,
                message: "Token is missing"
            }, { status:403 })
        }

        const checkRoom = await Room.findOne({ name });
        if (checkRoom) {
            return Response.json({
                success: false,
                message: "Please try a unique room name"
            }, { status: 400 })
        }
        const decoded = jwt.verify(token || '', process.env.JWT_SECRET as string);
        console.log("Decoded: ", decoded);
        
        const room: Room = await Room.create({
            name,
            description,
            user: decoded?.user?._id,
            task: [],
            code: parseInt(code)
        })
    
        return Response.json({
            data: room,
            message: `Sucessfully created The room with the name ${room.name}`,
            success: true
        }, { status: 200 })
    } catch (error) {
        console.log(error);
        return Response.json({
            message: `Internal Server Error`,
            success: false
        }, { status: 500 })
    }
}

export async function GET(req: Request) {
    try {
        const cookie = cookies();
        const hasCookie = cookie.has('token');
        if (!hasCookie) {
            return Response.json({
                success: false,
                message: "Token is missing"
            })
        }
        const room = await Room.find().select('-code');
        if(room.length === 0 || !room) {
            return Response.json({
                success: true,
                message: "No Rooms to show"
            }, { status: 201 })
        }
    
        return Response.json({
            data: room,
            message: "Here are all the rooms"
        }, { status: 201 })
    } catch (error) {
        console.log(error);
        console.error(error);
        return Response.json({
            success: false,
            message: "Internal server error"
        },{ status: 500 })
    }
}

