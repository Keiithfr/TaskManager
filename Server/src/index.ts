import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contactRoutes.js"
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

await connectDB();
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);


app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});