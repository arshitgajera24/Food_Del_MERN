import { Router } from "express";
import { addFood, listFood, removeFood } from "../controllers/foodControllers.js";
import multer from "multer";

export const foodRouter = Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    } 
})

const upload = multer({storage})

foodRouter.route("/add").post(upload.single("image"), addFood);
foodRouter.route("/list").get(listFood);
foodRouter.route("/remove").post(removeFood);