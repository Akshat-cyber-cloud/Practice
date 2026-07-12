import mongoose from "mongoose";

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected");
    }catch (error){
        console.error("MongoDb Connection Failed");
        process.exit(1);
    }
};

export default connectDb;