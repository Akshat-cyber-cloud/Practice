import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter the username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is must"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password must be 6 chars long"],
        minLength: 6,
        maxLength: 128
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

export default User;