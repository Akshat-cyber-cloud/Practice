import Post from "../model/post.model";

const createPost = async (req,res) => {
    try{
        const {title , content} = req.body;

        if(!title || !content){
            return res.status(400).json({
                message: "Title and Content are required"
            });
        }

        const post = Post.create({
            title,
            content,
            author: req.user._id
        });

        return res.status(201).json({
            message: "Post Created Successfully",
            post
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getAllPosts = async (req,res) => {
    try{
        const posts = await Post.find().populate("author", "name email");
        return res.status(200).json({
            posts
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getPostById = async (req,res) => {
    try{
        const post = await Post.findById(req.params.id).populate("author", "name email");

        if(!post){
            return res.status(404).json({
                message: "Post Not Found"
            });
        }

        return res.status(200).json({
            post
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


