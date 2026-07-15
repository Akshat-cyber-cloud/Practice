import app from "./src/app.js";
import connectDb from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDb();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});