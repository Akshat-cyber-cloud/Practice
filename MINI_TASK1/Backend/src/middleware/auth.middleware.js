import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token, access denied" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};