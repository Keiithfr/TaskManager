import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Task from "../models/Task.js";

const router = Router();

router.post("/", authMiddleware,
    async (req, res) => {

        try {
            const { title, category, dueDate, dueTime } = req.body;
            if (!title || !title.trim()) {
                return res.status(400).json({
                    message: "Tak title is required"
                });
            }

            const task = await Task.create({
                userId: req.user!.id,
                title,
                category,
                dueDate,
                dueTime
            });

            res.status(201).json({
                message: "Task created successfully",
                task
            });
        } catch (err) {
            res.status(500).json({
                message: "Server error"
            });
        }

    })


export default router