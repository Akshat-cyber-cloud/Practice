// A Schema defines the structure of a User.
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: 8,
        },
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model("User",UserSchema);
export default User;