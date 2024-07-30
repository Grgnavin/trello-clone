import dbConnect from "@/app/lib/dbConnect";
import Room from "@/models/roomModel";
import { useSearchParams } from 'next/navigation';

export async function GET(req: Request) {
    await dbConnect();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    if (!id) {
        return Response.json({
            success: false,
            message: "All fields are required"
        }, { status: 400 })
    }

    try {
        const room = await Room.findById(id).populate('task');
        if (!room) {
            return Response.json({
                success: false,
                message: "room doesn't exits"
            }, { status: 402 })
        }
        return Response.json({
            sucess: true,
            data: room
        }, { status: 200 })
    } catch (error) {
        console.error('Error fetching room:', error);
        return Response.json({
            success: false,
            message: "Server error"
        }, { status: 500 });
    }
}