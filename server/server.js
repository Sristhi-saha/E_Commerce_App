import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/index.js";




const adminProductsRouter = express.Router();
import authRouter from "./routes/auth/auth-routes.js";


dotenv.config({
    path: "./.env"
})

const app = express();
const PORT = process.env.PORT || 5000

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
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
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductsRouter);
