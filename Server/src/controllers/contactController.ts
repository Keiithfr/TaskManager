import type { Request, Response } from "express";
import { Contact } from "../models/Contact.js";
import { sendContactEmail } from "../services/emailService.js";


export const createContact = async (
    req: Request,
    res: Response
) => {

    const { name, email, phone, message } = req.body;
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
        )
    } catch (err) {
        console.error("Email failed:", err);
    }

    res.status(201).json({
        message: "Message sent successfully.",
        contact,
    })




}