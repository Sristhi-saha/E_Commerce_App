import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

import adminProductsRouter from "./routes/admin/products-routes.js";
import authRouter from "./routes/auth/auth-routes.js";
import shopProductRouter from './routes/shop/products-routes.js'

dotenv.config({
    path: "./.env"
})
console.log('=== DEBUG INFO ===');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_URI value:', process.env.MONGODB_URI);
console.log('==================');

const app = express();
const PORT = process.env.PORT || 5000

app.use(cookieParser());
app.use(express.json());

// FIX: Use an array instead of || operator
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174", 
        "http://localhost:5175",
        "http://localhost:5176"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials: true
}))

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/products', shopProductRouter);