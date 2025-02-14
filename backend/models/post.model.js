import mongoose from 'mongoose'
import Joi from 'joi'

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

export const validatePost = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label("title"),
        description: Joi.string().required().label("description")
    })
    return schema.validate(data)
} 

export const Post = mongoose.model("Post", postSchema)