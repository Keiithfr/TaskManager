import styles from './Login.module.css';
import { useState, } from 'react';
import type { ChangeEvent } from 'react';
import type { SubmitEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
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
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <h2>Login</h2>
            <input name='email'
                placeholder='email'
                value={form.email}
                onChange={handleChange}
                disabled={loading} />
            <input name='password'
                type='password'
                placeholder='password'
                value={form.password}
                onChange={handleChange}
                disabled={loading} />

            <button type='submit' disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>

            {message && <p>{message}</p>}


        </form>
    )
};

export default Login