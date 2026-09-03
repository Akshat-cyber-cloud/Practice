import Task from "../models/Task.model.js";

export const createTask = async (req , res) => {
    try{
        const {title , description , status} = req.body;

        if(!title || !description || !status){
            return res.status(400).json({message: "All fields are required"});
        }

        const task = await Task.create({
            title,
            description,
            status,
            owner: req.user._id
        });

        return res.status(201).json({
            success: true,
            message: "Task Created Successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getTask = async (req,res) => {
    try{
        const tasks = await Task.find({
            owner: req.user._id
        }).populate("owner", "name email");

        return res.status(200).json({
            success: true,
            message: "Tasks Fetched Successfully",
            tasks
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const updateTask = async (req,res) => {
    try{
        const {title, description , status} = req.body;

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        });

        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        if(title){
            task.title = title;
        }

        if(description){
            task.description = description;
        }

        if(status){
            task.status = status;
        }

        await task.save();

        return res.status(200).json({
            success: true,
            message: "Task Updated Successfully",
            task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteTask = async (req,res) => {
    try{
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        });

        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        return res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}