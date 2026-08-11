import User from "../models/userModel.js";

export const getUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: err.message
        })
    }
};

export const getUserById = async (req,res) => {
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: err.message
        })
    }
}

export const createUser = async (req,res) => {
    try{
        const {name, age, domain} = req.body;

        const newUser = await User.create({
            name,
            age,
            domain
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            newUser
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: err.message
        })
    }
}


export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
};



export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
