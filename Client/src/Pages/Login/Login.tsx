import styles from './Login.module.css';
import { useState, } from 'react';
import type { ChangeEvent } from 'react';
import type { SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";





const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            login(data.user);
            navigate("/dashboard");





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
        <section className={styles.loginSection}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <div className={styles.arrowDiv}>
                    <FaArrowRightToBracket className={styles.arrow} />
                </div>
                <h2>Sign in with email</h2>
                <div className={styles.inputWrapper}>
                    <MdEmail className={styles.inputIcon} />

                    <input

                        name='email'
                        placeholder='Email'
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading} />
                </div>

                <div className={styles.inputWrapper}>

                    <IoMdLock className={styles.inputIcon} />

                    <input name='password'
                        type='password'
                        placeholder='Password'
                        value={form.password}
                        onChange={handleChange}
                        disabled={loading} />

                </div>

                <Link to="/forgot-password" className={styles.fpLink}>Forgot password?</Link>



                <button type='submit' disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
                <p>Don't have an account? <Link to="/signup" className={styles.pLink}>Signup</Link></p>

                {message && <p>{message}</p>}




            </form>
        </section>
    )
};

export default Login