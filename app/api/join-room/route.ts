import dbConnect from "@/lib/dbConnect";
import Room from "@/models/roomModel";

interface ReqBody {
    name: string;
    code : number
}
export async function POST(req: Request) {
    const { name, code }: ReqBody = await req.json();
    await dbConnect();
    try {
        if (!name || !code) {
            return Response.json({
                success: false,
                message: "All fields are required"
            }, { status: 400 })
        }

        const room = await Room.findOne({ code })

        if (!room) {
            return Response.json({
                success: false,
                message: "Room not found"
            }, { status: 400 })
        }

        return Response.json({
            data: room,
            message: `Sucessfully entered the room ${room.name}`,
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