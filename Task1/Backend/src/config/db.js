import mongoose from "mongoose";

const connectDb = () => {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected");
    }catch (error){
        console.error("error");
    }
}

export default connectDb;