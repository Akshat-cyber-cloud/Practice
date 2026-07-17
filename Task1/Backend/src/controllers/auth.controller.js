import User from "../model/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const generateToken = async (id) => {
    return jsonwebtoken({id}, process.env.JWT_SECRET, {
        expiresIn: '10m'
    });
}

export const register = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        if(!email || !email.includes('@')){
            return res.status(400).json({
                message: "Invaild Email"
            })
        }

        if(!password || password.length < 6){
            return res.status(400).json({
                message: "Password must be 6 chars long"
            });
        }

        const userExists = User.findOne({email});
        if(userExists){
            return res.status(400).json({
                message: "Already Registered",
                success: false
            })
        }

        const salt = bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password,salt);

        const user = await User.create({
            name, 
            email, 
            password: hashedPass,
        });

        if(user){
            const token = generateToken(user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,

                message:  "Registered Successfully"
            });
        }else{
            return res.status(400).json({
                message: "Invalid"
            });
        }

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const login = async (req,res) => {
    try{
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message: "Invalid"
            });
        }

        const isMatched = await bcryptjs.compare(password, user.password);

        if(!isMatched){
            return res.status(400).json({
                message: "Invalid"
            });
        }

        const token = await generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,

            message: "Logged in Successfully"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(user){
            res.status(200).json({
                user
            })
        }else{
            res.status(404).json({
                message: "User not found"
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}