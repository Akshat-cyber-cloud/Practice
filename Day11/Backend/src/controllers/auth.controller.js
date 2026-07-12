// A Controller directs the request to the correct business logic (service) and prepares the HTTP response.

import loginUser, { registerUser } from "../services/auth.service.js";

export const login = async(req,res) => {
    try{
        const {email , password} = req.body;

        const user = await loginUser(email,password);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user,
        });

    }catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Internal Server Error"
        });
    }
}

export const register = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await registerUser(email, password);

        return res.status(201).json({
            success: true,
            message: "User registered",
            user,
        });

    }catch (error) {
        // handle common errors
        if(error.name === 'ValidationError'){
            return res.status(400).json({ success: false, message: error.message });
        }

        if(error.code === 11000){
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        if(error.message && error.message.includes('User already exists')){
            return res.status(409).json({ success: false, message: error.message });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}