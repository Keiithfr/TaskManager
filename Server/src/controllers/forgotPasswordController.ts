import type { Request, Response } from "express";
import { User } from "../models/User.js";
import crypto from "crypto";
import { sendPasswordResetEmail } from "../services/emailService.js";

export const forgotPasswordController = async (
    req: Request,
    res: Response
) => {

    try {
        const { email } = req.body; //desxtructuring

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");


        const resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000);

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = resetTokenExpires;

        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        await sendPasswordResetEmail(
            user.email,
            resetUrl
        )





        return res.json({
            message: "Request received. Check your email to reset password.",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Server error",
        })
    }



}

