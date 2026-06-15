import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/connect.js"


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

await connectDB();

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});