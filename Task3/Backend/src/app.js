import express from "express";
import ProductRoute from "./routes/product.route.js";

const app = express;

app.use(express.json());
app.use("/api/products",ProductRoute);

export default app;