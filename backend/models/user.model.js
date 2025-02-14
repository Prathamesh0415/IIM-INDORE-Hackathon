import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import passwordComplexity from 'joi-password-complexity'

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilePhoto:{
        type: String,
        required: true
    },
    aadharNumber:{
        type: Number,
        required: true
    }
}, {timestamps: true})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        firstName: this.firstName,
        email: this.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: '7d'
    })
    return token
}

export const validateRegister = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required().label("First Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        aadharNumber: Joi.number().required().label("aadhar")
    })
    return schema.validate(data)
}

export const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(data)
}

export const User = mongoose.model("User", userSchema)