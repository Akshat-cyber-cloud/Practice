import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = jwt.sign({
            _id: user._id,
            email: user.email,
            username: user.username
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });

        const refreshToken = jwt.sign({
            _id: user._id
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });


        return { accessToken, refreshToken };
    } catch (error) {
        console.log("Error generating tokens", error);
        throw error;
    }
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, fullName, password } = req.body;

        if (!username || !email || !fullName || !password) {
            return res.status(400).json({
                message: "All Fields Are Required"
            })
        };

        const userExists = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (userExists) {
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            fullName,
            password: hashedPassword
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(201).json({
            message: "User Registered Successfully",
            createdUser
        });

    } catch (error) {
        console.log("Error registering user", error);
        throw error;
    }
}

export const loginUser = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        if (!usernameOrEmail || !password) {
            return res.status(400).json({
                message: "Username/Email and Password are Required"
            })
        };

        const user = await User.findOne({
            $or: [
                { username: usernameOrEmail.toLowerCase() },
                { email: usernameOrEmail.toLowerCase() }
            ]
        });

        if (!user) {
            return res.status(400).json({
                message: "User Doesn't Exist"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User Logged In Successfully",
                user: loggedInUser,
                accessToken
            });
    } catch (error) {
        console.log("Error logging in user", error);
        throw error;
    }
}