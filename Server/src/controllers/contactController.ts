import type { Request, Response } from "express";
import { Contact } from "../models/Contact.js";
import { sendContactEmail, sendConfirmationEmail } from "../services/emailService.js";



export const createContact = async (
    req: Request,
    res: Response
) => {

    const name = req.body.name?.trim();
    const email = req.body.email?.trim();
    const phone = req.body.phone?.trim();
    const message = req.body.message?.trim();



    if (!name || !email || !phone || !message) {
        return res.status(400).json({
            message: "Kindly fill in all the fields."
        })
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            message: "Please provide a valid email address."
        });
    }

    const phonePattern = /^[0-9+\-\s()]+$/;

    if (!phonePattern.test(phone)) {
        return res.status(400).json({
            message: "Please provide a valid phone number."
        });
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        message,
    })

    try {
        await sendContactEmail(
            name,
            email,
            phone,
            message
        );
        await sendConfirmationEmail(
            name,
            email
        );
    } catch (err) {
        console.error("Email failed:", err);
    }

    res.status(201).json({
        message: "Message sent successfully.",

    })




}