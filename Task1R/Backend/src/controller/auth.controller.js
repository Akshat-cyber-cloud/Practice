import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const generateToken = () => {
    return jsonwebtoken.sign({id}, 
        process.env.JWT_SECRET,{expiresIn: '20m'});
}

const registerUser = async (req,res) => {
    try{
        const {name , email , password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        const existUser = await User.findOne({email});
        if (existUser){
            return res.status(400).json({message: "User already exist"})
        }

        const passwordHash = await bcryptjs.hash(password,10);

        const createUser = await User.create({
            name,
            email,
            passwordHash
        })

        const token = generateToken(createUser._id);

        return res.status(201).json({
            _id: createUser._id,
            name: createUser.name,
            email: createUser.email,
            token,
            message: "User created successfully"
        })
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

const loginUser = async(req,res) => {
    try{
        const {email , password} = req.body;

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({
                message: "User Already Exists"
            })
        };

        const isMatch = bcryptjs.compare(password, userExist.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid"
            })
        }

        const token = await generateToken(userExist._id);

        res.status(200).json({
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
            token,

            message: "Logged in successfully"
        });
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        return res.status(200).json(user);
    }catch(error){
        console.log(error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export {registerUser,loginUser, getProfile};
