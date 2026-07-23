import Post from "../model/post.model.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";

// POST /posts — Create a new post
const createPost = async (req, res) => {
    try {
        // ✅ Zod validation
        const result = createPostSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.errors.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                })),
            });
        }

        const { title, content } = result.data;

        const post = await Post.create({
            title,
            content,
            author: req.user._id,
        });

        return res.status(201).json({
            message: "Post Created Successfully",
            post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// GET /posts — Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "name email");
        return res.status(200).json({
            posts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// GET /posts/:id — Get a single post by ID
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(
            "author",
            "name email"
        );

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found",
            });
        }

        return res.status(200).json({
            post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// PUT /posts/:id — Update a post
const updatePost = async (req, res) => {
    try {
        // ✅ Zod validation
        const result = updatePostSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Validation failed",
                errors: result.error.errors.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                })),
            });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post Not Found",
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized, you are not the owner",
            });
        }

        const { title, content } = result.data;
        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();
        return res.status(200).json({
            message: "Post Updated Successfully",
            post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// DELETE /posts/:id — Delete a post
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post Not Found",
            });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized, you are not the owner",
            });
        }

        await post.deleteOne();
        return res.status(200).json({
            message: "Post Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const postController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};

export default postController;