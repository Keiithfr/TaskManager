import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const existingUser = await User.findOne({
            email,
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            })
        }

        const hashedPassword = await bcrypt.hash(
            password, 10
        )

        await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }

});

router.post("/login", async (req, res) => {

})

export default router;