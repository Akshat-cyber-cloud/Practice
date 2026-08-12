import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

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


export const registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message: "All Fields are required",
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(String(password),10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const loginUser = async (req,res) => {
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "All Fields are required",
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message: "User not found Or Wrong Password",
            });
        }

        const isMatch = await bcrypt.compare(String(password), user.password);

        if(!isMatch){
            return res.status(404).json({
                message: "User not found Or Wrong Password",
            });
        }

        return res.status(200).json({
            message: "User logged in successfully",
            user
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}