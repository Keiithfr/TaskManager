import styles from './Signup.module.css';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { ChangeEvent } from 'react';
import type { SubmitEvent } from 'react';

const Signup = () => {
    const [form, setForm] = useState({ email: "", password: "" });
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            setMessage(data.message);
            setForm({ email: "", password: "" });
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
        <form onSubmit={handleSubmit} className={styles.signupForm}>
            <h2>Sign up</h2>
            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                disabled={loading} />
            <input
                name="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                value={form.password}
                disabled={loading} />

            <button type='submit' disabled={loading}>
                {loading ? "Creating account..." : "Sign up"}
            </button>
            <p>
                Already have an account?<Link to="/Login">Login</Link>
            </p>
            {message && <p>{message}</p>}
        </form>
    )


}

export default Signup