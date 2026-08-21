import type { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";


export const resetPasswordController = async (
    req: Request,
    res: Response
) => {

    try {
        const token = req.params.token as string;
        const { password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                message: "Token and pasword required",
            });
        };

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: {
                $gt: new Date(),
            },

        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset link",
            });
        }

        const isSamePassword = await bcrypt.compare(
            password,
            user.password
        );

        if (isSamePassword) {
            return res.status(400).json({
                message: "You cannot reuse your current password",
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;


        await user.save();
        return res.status(200).json({
            message: "Password reset successfully",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error",
        });
    }

};