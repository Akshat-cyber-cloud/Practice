import jsonwebtoken from "jsonwebtoken";
import User from "../model/user.model.js";

export const protect = async (req,res,next) => {
    try{
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decoded = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal Server error"
        });
    }
}