import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv"

dotenv.config();

import connectDB from "./src/config/db";
import Product from "./src/model/Product.model";

const seedProducts = async () => {
    try{
        await connectDB();

        const response = await axios.get("https://dummyjson.com/products?limit=194");

        const products = response.data.products;

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log("Products seeded successfully");
    }
    catch(error){
        console.log("Error : ", error);
    }
}