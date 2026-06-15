import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ message: "Server is working 🚀" });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});