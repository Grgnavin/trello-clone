import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document{
    name: string,
    description: string,
    Deadline:  Date,
    user: mongoose.Schema.Types.ObjectId;
    status: Status,
    priority: Priority
}

enum Status {
    TODO = "to-do",
    IN_PROGRESS = "in-progress",
    UNDER_REVIEW = "under-review",
    FINISHED = "finished"
}

enum Priority {
    Low = "low",
    Medium = "medium",
    Urgent = "urgent",
}

const TaskSchema: Schema<ITask> = new mongoose.Schema({
    name: {
        required: [true, "Name is required"],
        type: String
    },
    description:{
        required: [true, "Description is required"],
        type: String
    },
    Deadline: {
        required: [true, "Deadline is required"], 
        type: Date
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.TODO
    },
    priority: {
        type: String,
        enum: Object.values(Priority),
        default: Priority.Low
    },
}, { timestamps: true });

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;