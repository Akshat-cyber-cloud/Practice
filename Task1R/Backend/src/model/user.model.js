import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is must"],
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 12
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);

export default User;