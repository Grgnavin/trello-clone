import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document{
    username: string,
    email: string,
    password: string,
    role: ROLE
}

export enum ROLE {
    ADMIN = "admin",
    USER = "user"
}

const UserSchema: Schema<IUser> =new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'please use a valid email address' ]
    },
    username: {
        required: [true, "Username is required"],
        trim: true,
        unique: true,
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(ROLE),
        default: ROLE.USER
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
