import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

    title:{
        type: String,
        required: [true, "Title is must"],
        minlength: 6,
        maxlength: 50,
    },

    description:{
        type: String,
        required: [true, "Discription is must"],
        minlength: 3,
        maxlength: 100
    },

    status: {
        type: String,
        enum: ["to-do", "in-progress", "completed"],
        default: "to-do"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner is must"]
    }
}, {timestamps: true});

const Task = mongoose.model("Task", TaskSchema);
export default Task;