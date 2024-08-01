import Task, { Priority } from '../../../models/taskModel';
import dbConnect from "@/lib/dbConnect";
import { Status } from "@/models/taskModel";

interface ReqBody {
    name: string;
    description: string;
    Deadline: Date;
    status: Status;
    priority :Priority
}

export async function POST(req: Request): Promise<any> {
    await dbConnect();
    const { name, description, Deadline, status, priority }: ReqBody = await req.json();

    const task = await Task.findOne({ name });

    if (task) {
        return Response.json({  
            success: false,
            message: "Task is already created"
        }, { status: 401 })
    }

    const createTask = await Task.create({
        name,
        description,
        Deadline,
        status: Status.TODO,
        priority: Priority.Medium,
        roomId: 12
    })

    return Response.json({
        sucess: true,
        data: createTask,
        message: `Task created successfully with the roomId:${createTask.roomId}`
    }, { status: 200 })
}