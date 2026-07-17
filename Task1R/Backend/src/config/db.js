import mongoose from "mongoose";

const connectDB = () => {
    try{
        const connect = mongoose.connect(process.env.MONGO_URI);
        if(connect){
            console.log("MongoDB Connected");
        }
    }catch (error){
        console.error(error);
    }
}

export default connectDB;