import mongoose from 'mongoose'
import Joi from 'joi'

const produceSchema = new mongoose.Schema({
    itemName:{
        type: String,
        required: true
    },
    itemDescription:{
        type: String,
        required: true
    },
    itemPrice:{
        type: Number,
        required: true
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

export const validateProduce = (data) => {
    const schema = Joi.object({
        itemName: Joi.string().required().label("itemName"),
        itemDescription: Joi.string().required().label("itemDescription"),
        itemPrice: Joi.number().required().label("itemPrice")
    })
    return schema.validate(data)
} 

export const Produce = mongoose.model("Produce", produceSchema)