import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendContactEmail = async (
    name: string,
    email: string,
    phone: string,
    message: string,
) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `
        Name: ${name}
        
        Email: ${email}
        
        Phone: ${phone}
        
        Message: ${message}
        `,
    })

}