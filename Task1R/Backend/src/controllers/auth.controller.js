import User from "../models/user.model";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const generateToken = async (id) => {
    return jsonwebtoken({ id }, process.env.JWT_SECRET, {
        expiresIn: '10m'
    });
}

export const register = async () => {
    try {
        const { name, email, password } = req.body;

        if (!email || !email.includes('@')) {
            return res.status(400).json({
                message: "Email is must"
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "Account Already Exists"
            })
        }

        const salt = bcryptjs.genSalt(10);
        const hashPassword = bcryptjs.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashPassword
        });

        if (user) {
            const token = generateToken(user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token,

                message: "Registered Successfully"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}