import app from "./src/app";
import connectDB from "./src/config/db";
import dotenv from "dotenv";

dotenv.config();

connectDB();

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})