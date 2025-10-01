import fs from "fs";
import { foodModel } from "../models/foodModel.js";

export const addFood = async (req, res) => {
     if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const image = req.file.filename;
        console.log("Uploaded file:", req.file);
        console.log("Request body:", req.body);

    const {name, description, price, category} = req.body;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image
    })

    try {
        await food.save();
        res.json({success: true, message: "Food Added Successfully"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Food Not Added"})
    }
}

export const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        return res.json({success:true, data: foods})
    } catch (error) {
        console.log(error);
        return res.json({success:false, message: "Error"})
    }
}

export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {})

        await foodModel.findByIdAndDelete(req.body.id);
        return res.json({success:true, message: "Food Removed Successfully"})
    } catch (error) {
        console.log(error);
        return res.json({success:false, message: "Error"})
    }
}
