import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try{
        const user = await User.findById(userId);
        
        const accessToken = jwt.sign(
            {_id: user._id, email: user.email, username: user.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
            {_id: user._id,},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return ({
            accessToken,
            refreshToken,
        });
    }
    catch(error){
        console.log("Error while Generating Tokens",error);
    }
}

export const registerUser = async (req , res) => {
    try{
        const {username, email, password, gender} = req.body;

        if(!username || !email || !password || !gender){
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            email,
            password: hashPassword,
            gender,
        });

        const createdUser = await User.findById(user ._id).select("-password");

        return res.status(201).json({
            message: "User Created Successfully",
            user: createdUser,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
} 

export const loginUser = async (req , res) => {
    try{
        const {usernameOrEmail , password} = req.body;

        if(!usernameOrEmail || !password){
            return res.status(400).json({
                message: "Fill All The Details Properly"
            });
        };

        const user = await User.findOne({
            $or: [
                {email: usernameOrEmail},
                {username: usernameOrEmail},
            ]
        });

        if(!user){
            return res.status(401).json({
                message: "Invalid Credential",
            })
        };

        const isPasswordMatch = await bcrypt.compare(password , user.password);

        if(!isPasswordMatch){
            return res.status(401).json({
                message: "Invalid Credential",
            })
        };

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure:true
        };

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(200).cookie("refreshToken", refreshToken ,options).json({
            message: "Logged In Successfully",
            user: loggedInUser,
            accessToken
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
}