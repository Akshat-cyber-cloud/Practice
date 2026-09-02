import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {

        const user = await User.findById(userId);

        if (!user) throw new Error("User not found");

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN,
            { expiresIn: "20m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN,
            { expiresIn: "5d" }
        );

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Something went wrong while generating tokens!");
    }
}

// POST /api/auth/refresh
export const refreshAccessToken = async (req, res) => {
    try {

        const incomingRefreshToken = req.cookies.refreshToken;

        if (!incomingRefreshToken) {
            return res.status(401).json({ message: "No refresh token" });
        }

        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN);

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN,
            { expiresIn: "20m" }
        );

        return res.status(200).json({ accessToken });

    } catch (error) {
        return res.status(401).json({ message: "Refresh token expired, login again" });
    }
};


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const UserExist = await User.findOne({ email });

        if (UserExist) {
            return res.status(409).json({ message: "User already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 7 * 1000
        };

        return res.status(201).cookie("refreshToken", refreshToken, cookieOptions).json({
            success: true,
            message: "User Registered Successfully",
            accessToken,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

        const cookieOptions = {
            httpOnly: true,
            secure: false,
            maxAge: 60 * 60 * 24 * 7 * 1000
        };

        return res.status(200).cookie("refreshToken", refreshToken, cookieOptions).json({
            success: true,
            message: "User Logged In Successfully",
            accessToken,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}