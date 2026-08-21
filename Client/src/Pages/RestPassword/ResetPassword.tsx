import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ChangeEvent, SubmitEvent } from "react";
import styles from "./ResetPassword.module.css";
import { IoMdLock } from "react-icons/io";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            if (form.password !== form.confirmPassword) {
                throw new Error("Passwords do not match");
            }
            if (!token) {
                throw new Error("Invalid reset link");
            }

            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        password: form.password,
                    }),
                }
            );

            const data = await res.json();

            // const text = await res.text();

            // console.log("Status:", res.status);
            // console.log("Response:", text);

            // if (!res.ok) {
            //     throw new Error(text || "Request failed");
            // }

            // const data = JSON.parse(text);


            if (!res.ok) {
                throw new Error(data.message);
            }

            setMessage(data.message);

            setTimeout(() => {
                navigate("/login"); 
            }, 2000)

        } catch (err) {
            if (err instanceof Error) {
                setMessage(err.message)
            } else {
                setMessage("Something went wronng")
            }
        } finally {
            setLoading(false)
        }

    }

    return (
        <section className={styles.rpSection}>


            <form onSubmit={handleSubmit} className={styles.rpForm}>
                <h1>Reset Password</h1>

                <p>Enter your new password below.</p>

                <div className={styles.inputWrapper}>

                    <IoMdLock className={styles.inputIcon} />
                    <input
                        type="password"
                        name="password"
                        placeholder="New password"
                        value={form.password}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>


                <div className={styles.inputWrapper}>

                    <IoMdLock className={styles.inputIcon} />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>

                {message && <p>{message}</p>}
            </form>
        </section>
    )

}


export default ResetPassword;