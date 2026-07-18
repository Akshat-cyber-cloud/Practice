import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const generateToken = (id) => {
    return jsonwebtoken.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

const registerUser = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        if(!email || !email.includes('@')){
            return res.status(400).json({
                message: "Please Provide The Email"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                message: "Password must be atleast 6 characters long"
            });
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if(user){
            return res.status(201).json({
                message: "User Created Successfully",
                token: generateToken(user._id),
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        }else{
            return res.status(400).json({
                message: "User Not Created"
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }
        return res.status(200).json({
            message: "User Logged In Successfully",
            token: generateToken(user._id),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const getProfile = async (req, res) => {
    try {
        return res.status(200).json({
            user: req.user
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


const authController = {
    registerUser,
    loginUser,
    getProfile
};

export default authController;