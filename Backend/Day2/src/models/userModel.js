import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    age: {
        type: Number,
        required: [true, "Age is required"]
    },
    domain: {
        type: String,
        required: [true, "Domain is must to add"]
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;