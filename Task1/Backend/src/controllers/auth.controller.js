import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const generateToken = (id) => {
    return jsonwebtoken.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '10m'
    });
}

export const register = async (req,res) => {
    try{
        const {name, email, password} = req.body;

        if(!email || !email.includes('@')){
            return res.status(400).json({
                message: "Invalid email address"
            })
        }
        
        if(!password || password.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if(user){
            const token = generateToken(user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token
            });
        }else{
            res.status(400).json({
                message: "Invalid User Data"
            })
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const login = async (req,res) => {
    try{
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message: "Invalid email"
            })
        };

        const isMatch = await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message: "Invalid password"
            })
        };

        const token = generateToken(user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            message: "Login Successful"
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
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