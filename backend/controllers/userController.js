import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { userModel } from "../models/userModel.js"

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

export const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user) return res.json({success: false, message: "User Doesn't Exists"})         
        
        const isMatch = await bcrypt.compare(password, user.password);        
        if(!isMatch) return res.json({success: false, message: "Invalid Credentials"})

        const token = await createToken(user._id);
        return res.json({success:true, token})
    } catch (error) {
        console.log(error);
        // return res.json({success:false, message: "Error"})
    }
}

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const exists = await userModel.findOne({email})

        if(exists) return res.json({success: false, message: "User Already Exists"})
        if(!validator.isEmail(email)) return res.json({success: false, message: "Please Enter Valid Email"});
        if(password.length < 6) return res.json({success: false, message: "Please Enter Strog passoword with minimum 6 letters"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        return res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error})
    }
}
