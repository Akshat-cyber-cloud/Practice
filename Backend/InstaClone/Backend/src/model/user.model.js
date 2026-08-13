import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName: {
        type: String,
        trim: true,
        required: [true, "Full Name is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: {
        type: String,
        default: ""
    },
    profilePic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png" 
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    refreshToken: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;