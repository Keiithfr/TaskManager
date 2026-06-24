import { Router } from "express";
import "express";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const router = Router();

export const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing")
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload; 
        }
    }
}
interface AuthPayload extends jwt.JwtPayload {
    id: string;
}

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
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Email entered is not linked to an account"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Password is incorrect"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, //for development
            sameSite: "lax", //for development
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error"
        })
    }
});
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, //for development
        sameSite: "lax" //for development

    });
    res.json({
        message: "Logged out"
    });
});



const authMiddleware = (req: Request,
    res: Response,
    next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Kindly log in"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            JWT_SECRET
        ) as AuthPayload;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid login token"
        })
    }
};

router.get("/me", authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.user!.id)
            .select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({
            message: "Server error"
        });
    }

});



export default router;