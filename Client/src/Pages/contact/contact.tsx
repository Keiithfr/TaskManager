import { useState, type ChangeEvent } from "react"
import type { SubmitEvent } from "react";
import styles from './contact.module.css'
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";


const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        setMessage("");

        if (loading) return;



        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(form),
            });
            const data = await res.json()
            if (!res.ok) throw new Error(data.message);

            setMessage(data.message);

            setForm({
                name: "",
                email: "",
                phone: "",
                message: "",
            });


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
        <>
            <section className={styles.contactSection}>
                <div className={styles.formDiv}>
                    <h1>CONTACT US</h1>
                    <div className={styles.formContainer}>
                        <div className={styles.h2Container}><h2>GET IN TOUCH</h2> </div>

                        <form onSubmit={handleSubmit} className={styles.contactForm}>

                            <div className={styles.field}>
                                <label>NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading} />
                            </div>
                            <div className={styles.field}>
                                <label>EMAIL</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email "
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    disabled={loading} />
                            </div>
                            <div className={styles.field}>
                                <label>PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number "
                                    value={form.phone}
                                    onChange={handleChange}
                                    disabled={loading} />
                            </div>
                            <div className={styles.message}>
                                <label>YOUR MESSAGE</label>
                                <textarea name="message"
                                    placeholder=" Your message"
                                    value={form.message}
                                    onChange={handleChange}
                                    disabled={loading}></textarea>
                            </div>

                            <button type='submit' disabled={loading}>
                                {loading ? "sending..." : "SEND MESSAGE"}
                            </button>

                            {message && <p>{message}</p>}


                        </form>
                    </div>
                </div >

                <div className={styles.info}>
                    <h3>if you have any questions,please feel free to get in touch with us via phone,text,email,
                        the form attached or even on social media.
                    </h3>
                    <div className={styles.contactInfo}>
                        <div className={styles.h2Container}>
                            <h2>CONTACT INFORMATION</h2>
                        </div>
                        <div className={styles.individualInfoContainer}>
                            <div className={styles.individualInfo}>
                                <div className={styles.top}>
                                    <FiPhone style={{ color: "red" }} />
                                    <h5>PHONE</h5>
                                </div>
                                <span>773-565-240</span>
                            </div>
                            <div className={styles.individualInfo}>
                                <div className={styles.top}>
                                    <IoLocationOutline style={{ color: "red" }} />
                                    <h5>ADDRESS</h5>
                                </div>
                                <span>64street, Kingdrive, Chicago</span>
                            </div>
                            <div className={styles.individualInfo}>
                                <div className={styles.top}>
                                    <MdOutlineEmail style={{ color: "red" }} />
                                    <h5>Email</h5>
                                </div>
                                <span>loscarcorp600@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.businessHours}>
                        <div className={styles.h2Container}>
                            <h2>BUSINESS HOURS</h2>
                        </div>
                        <div className={styles.hours}>
                            <div className={styles.individualHours}>
                                <h6>MONDAY-FRIDAY</h6>
                                <span style={{ color: "grey" }}>9:00am-8:00pm</span>
                            </div>
                            <div className={styles.individualHours}>
                                <h6>SATURDAY</h6>
                                <span style={{ color: "grey" }}>9:00am-:600pm</span>
                            </div>
                            <div className={styles.individualHours}>
                                <h6>SUNDAY</h6>
                                <span style={{ color: "grey" }}>9:00am-5:00pm</span>
                            </div>
                        </div>

                    </div>
                </div>
            </section >

        </>

    )


}

export default Contact