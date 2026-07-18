import jsonwebtoken from "jsonwebtoken";
import User from "../model/user.model.js";


const protect = async (req,res,next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                message: "Not authorized, no token provided"
            })
        }

        const token = authHeader.split(' ')[1];
        const decodeToken = jsonwebtoken.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decodeToken.id).select("-password");

        if(!req.user){
            return res.status(401).json({
                message: "Not authorized"
            })
        }

        next();
    } catch(error) {
        return res.status(401).json({
            message: "Not authorized, invalid or expired token"
        })
    }
}

const authMiddleware = {
    protect
}

export default authMiddleware;