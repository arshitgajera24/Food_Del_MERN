import { userModel } from "../models/userModel.js"

export const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;

        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else
        {
            cartData[req.body.itemId]++;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        return res.json({success:true, message: "Item Added into Cart"})
    } catch (error) {
        console.log(error);
        return res.json({success:false, message: "Error"});
    }
}

export const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0)
        {
            cartData[req.body.itemId]--;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        return res.json({success:true, message: "Item Removed From cart"});
    } catch (error) {
        console.log(error);
        return res.json({success:false, message: "Error"});
    }
} 

export const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;

        return res.json({success: true, cartData})
    } catch (error) {
        console.log(error);
        return res.json({success:false, message: "Error"});   
    }
}