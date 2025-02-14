import { Post, validatePost } from "../models/post.model.js";

export const createPost = async (req, res) => {
    try{
        const { error } = validatePost(req.body)
        if(error){
            res.status(400).send({message: error.details[0].message})
        }
        const id = req.id
        const { title, description } = req.body;
        const post = await Post.create({
            title,
            description,
            author: id
        })
        res.status(200).send({
            post,
            message: "post created successfully",
            success: true
        })
        
    }catch(error){
        console.log("error in forum controller", error)
        res.status(400).send("internal server error")
    }
}

export const deletePost = async (req, res) => {
    try{
        const postId = req.params.id
        if(!postId) return res.status(400).send({message: error.details[0].message})
        const post = await Post.findByIdAndDelete(postId)
        if(!post) return res.status(404).send({message: "post not found"})
        return res.status(200).send({
    post,
    message: "Post deleted successfully",
    success: true
    })
    }catch(error){
        console.log("error in forum controller", error)
    }
}