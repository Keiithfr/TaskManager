import { useState } from "react"
import type { ChangeEvent, SubmitEvent } from "react";
import { MdEmail } from "react-icons/md";
import styles from './ForgotPassword.module.css'


const ForgotPassword = () => {

    const [form, setForm] = useState({ email: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setMessage(data.message);




        } catch (err) {
            if (err instanceof Error) {
                setMessage(err.message);

            } else {
                setMessage("Something went wrong");
            }

        } finally {
            setLoading(false);
        }


    }

    return (
        <section className={styles.fpSection}>


            <form onSubmit={handleSubmit} className={styles.fpForm}>

                <h1>Forgot Password?</h1>

                <p>
                    Enter your email address and we'll send you a link to reset
                    your password.
                </p>
                <div className={styles.inputWrapper}>
                    <MdEmail className={styles.inputIcon} />

                    <input

                        name='email'
                        type="email"
                        placeholder='Email'
                        value={form.email}
                        required
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>

                <button type='submit' disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Link "}
                </button>

                {message && <p>{message}</p>}
            </form>


        </section>
    )


}

export default ForgotPassword;