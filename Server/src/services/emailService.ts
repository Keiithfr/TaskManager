import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const escapeHtml = (value: string) => {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

export const sendContactEmail = async (
    name: string,
    email: string,
    phone: string,
    message: string,

) => {

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${safeName}`,
        html: `
        <div style="
          font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 8px;
        "
        >
        <h2 style="margin-bottom: 25px;">
            New Contact Form Submission
        </h2>

        <p>
            <strong>Name:</strong> ${safeName}
        </p>

        <p>
            <strong>Email:</strong> ${safeEmail}
        </p>

        <p>
            <strong>Phone:</strong> ${safePhone}
        </p>

        <div style="
            margin-top: 25px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 5px;
        ">
            <strong>Message</strong>

            <p>${safeMessage}</p>
        </div>
        
        
        
        
        
        </div>`
    })

}

export const sendConfirmationEmail = async (
    name: string,
    email: string,
) => {

    const safeName = escapeHtml(name);
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "We've received your message",
        html: `
           <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 30px;
            ">

                <h2>Thanks for contacting loscar!</h2>

                <p>Hi ${safeName},</p>

                <p>
                    We've received your message and
                    will get back to you as soon as possible.
                </p>

                <p>
                    Thanks for reaching out to us.
                </p>

                <p>
                    <strong>loscar</strong>
                </p>

            </div>

        
        
        `
    })
}


export const sendPasswordResetEmail = async (
    email: string,
    resetUrl: string,
) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset your loscar password",

         html: `
            <div style="
                font-family: Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 30px;
            ">

                <h2>Password Reset</h2>

                <p>
                    We received a request to reset your password.
                </p>

                <p>
                    Click the button below to choose a new password.
                </p>

                <p>
                    <a
                        href="${resetUrl}"
                        style="
                            display: inline-block;
                            padding: 12px 20px;
                            background: #000;
                            color: #fff;
                            text-decoration: none;
                            border-radius: 6px;
                        "
                    >
                        Reset Password
                    </a>
                </p>

                <p>
                    This link will expire in 15 minutes.
                </p>

                <p>
                    If you didn't request a password reset,
                    you can safely ignore this email.
                </p>

                <p>
                    <strong>loscar</strong>
                </p>

            </div>
        `

    })
}


