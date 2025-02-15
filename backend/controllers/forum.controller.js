import { Post, validatePost } from "../models/post.model.js";

export const getAllPost = async (req, res) => {
    const posts = await Post.find({})
    res.status(200).send(posts)
}

export const getPost = async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if(post){
        res.status(200).send(post)
    }
    else{
        res.status(404).send({message: "post not available"})
    }
}

export const updatePost = async (req, res) => {
    const { error } = validatePost(req.body)
    if(error){
        res.status(400).send({message: error.details[0].message}) 
    }
    const { id } = req.params
    await Post.findByIdAndUpdate(id, req.body)
    res.status(200).send({message: "Post updated successfully", success: true})
}

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