import User from "../model/user.model.js";

export const getUsers = async (req,res) => {
    const users = await User.find();

    return res.status(200).json({
        message: "Fetched the users data",
        users
    });
};

export const getUserById = async (req,res) => {
    const {id} = req.params;

    const user = await User.findById(id);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        message: "Fetched the user data",
        user
    });
}

export const createUser = async (req,res) => {
    const {name , email , password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "All the fields are required"
        });
    }

    const user = await User.create({
        name,
        email,
        password
    });

    return res.status(200).json({
        message: "User created successfully",
        user
    });
}


export const updateUserDetails = async (req,res) => {
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id , req.body , {new : true});

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        message: "User updated successfully",
        user
    });
}



export const deleteUser = async (req,res) => {
    const {id} = req.params;

    const user = await User.findByIdAndDelete(id);

    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    return res.status(200).json({
        message: "User deleted successfully",
        user
    });
}