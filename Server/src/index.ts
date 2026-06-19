import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db/connect.js"
import authRoutes from "./routes/auth.js"


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

await connectDB();
app.use("/api/auth", authRoutes);


app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});