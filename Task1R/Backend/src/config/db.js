import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if (connect) {
            console.log("MongoDB Connected");
        } else {
            console.log("MongoDB Error");
        }
    }catch (error){
        console.log(error);
    }
}

export default connectDB;