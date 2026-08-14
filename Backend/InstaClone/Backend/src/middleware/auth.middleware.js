import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const verfiyJWT = async (req,res,next) => {
    try{
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                message: "Unauthorized Request"
            })
        };

        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        req.user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if(!req.user){
            return res.status(401).json({
                message: "Unauthorized Request"
            })
        }

        next();
        
    }catch(error){
        console.log("Error in verification", error);
        throw error;
    }
}