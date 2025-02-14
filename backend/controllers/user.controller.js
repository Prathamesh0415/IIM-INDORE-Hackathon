import { User, validateRegister, validateLogin } from "../models/user.model.js"
//import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try{
        const { error } = validateRegister(req.body)
        if(error){
            return res.status(400).send({ message: error.details[0].message})
        }
        const {fullName, email, password, aadharNumber} = req.body
        const alreadyUser = await User.findOne({email})
        if(alreadyUser) return res.status(400).json({message: "User already exists with this email", success:false})
        const hashedPassword = await bcrypt.hash(password, 10)
        const profilePhoto = 'https://avatar.iran.liara.run/public/boy'
        const user = await User.create({
            fullName,
            email,
            password:hashedPassword,
            profilePhoto,
            aadharNumber
        })
        return res.status(201).json({
            user,
            message:"Account created successfully",
            success: true
        })
    }catch(error){
        console.log("error in user controller",error);
        res.status(400).send({message: 'internal server error'})
    }
}

export const login = async (req, res) => {
    try{
        const { error } = validateLogin(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({message: "incorrect email or password", success: false})
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!user || !isPasswordMatch) return res.status(401).json({message: "incorrect email or password", success: false})
        
        const token = user.generateAuthToken()
        return res.status(200).cookie('token', token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            message:`${user.fullName} logged in successfully`,
            user,
            success:true})

    }catch(error){
        console.log("error in user controller",error);
        res.status(400).send({message: 'internal server error'})
    }
}