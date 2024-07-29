import mongoose, { Schema, Document } from 'mongoose';
import { ROLE } from './userModel';

interface IRoom extends Document{
    name: string,
    description: string,
    user: mongoose.Schema.Types.ObjectId,
    task: mongoose.Schema.Types.ObjectId,
    code: number
};

const RoomModel: Schema<IRoom> = new mongoose.Schema({
    name: {
        required: [true, "Name is required"],
        type: String,
        unique: true
    },
    description: {
        required: [true, "Description is required"],
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    code: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Room = mongoose.models.Room || mongoose.model<IRoom>('Room', RoomModel);
export default Room;