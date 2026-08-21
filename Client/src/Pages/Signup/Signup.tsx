import styles from './Signup.module.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { ChangeEvent } from 'react';
import type { SubmitEvent } from 'react';
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const Signup = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            console.log(`${import.meta.env.VITE_API_URL}/signup`);

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setMessage(data.message);
            setForm({ name: "", email: "", password: "" });
            navigate("/login");

        } catch (err) {
            if (err instanceof Error) {
                setMessage(err.message);

            } else {
                setMessage("Something went wrong");
            }

        } finally {
            setLoading(false);
        }


    };

    return (

        <section className={styles.signupSection}>
            <form onSubmit={handleSubmit} className={styles.signupForm}>
                <h2>Sign up</h2>

                <div className={styles.inputWrapper}>
                    <FaUser className={styles.inputIcon} />
                    <input
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                        value={form.name}
                        disabled={loading} />
                </div>

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

                <button type='submit' disabled={loading}>
                    {loading ? "Creating account..." : "Sign up"}
                </button>
                <p>
                    Already have an account?<Link to="/Login" className={styles.pLink}>Login</Link>
                </p>
                {message && <p>{message}</p>}
            </form>
        </section>
    )


}

export default Signup