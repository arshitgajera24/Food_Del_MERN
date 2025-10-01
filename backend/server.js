import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { foodRouter } from "./routes/foodRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { cartRouter } from "./routes/cartRoute.js";
import { orderRouter } from "./routes/orderRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("Helloww");
})

app.listen(PORT, () => {
    console.log(`🚀 Server Running on http://localhost:${PORT}`);
})

