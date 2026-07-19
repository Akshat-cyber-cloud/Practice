import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter);
app.use('/posts', postRouter);

export default app;