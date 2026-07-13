import styles from './Home.module.css'
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleGetStarted = () => {
        if (user) {
            navigate("/dashboard")
        }
        else {
            navigate("/signup")
        }
    }
    const handleLogIn = () => {
        navigate(user ? "/dashboard" : "/login")
    }
    return (
        <>
            <section id='home'>
                <div className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1>Stay Productive<br />
                            <span> Stay Accountable</span>
                        </h1>


                        <p>Manage your tasks, track your progress,<br /> and never miss a deadline
                            -all in one simple workspace.
                        </p>

                        <div className={styles.buttonsDiv}>
                            <button onClick={handleGetStarted}>Get Started</button>
                            <button onClick={handleLogIn}>{user ? "Dashboard" : "Sign In"}</button>
                        </div>
                    </div>
                </div>
            </section>

            <section id='features' className={styles.features}>
                <div className={styles.taskManagement}>
                    <div className={styles.top}> <TiTick className={styles.tick} /><h3>Task Management</h3></div>
                    <p>Create,edit and organize tasks effortlessly</p>
                </div>
                <div className={styles.taskManagement}>
                    <div className={styles.top}>  <TiTick className={styles.tick} /><h3>Progress Tracking</h3></div>
                    <p>Monitor completed and pending tasks.</p>
                </div>
                <div className={styles.taskManagement}>
                    <div className={styles.top}> <TiTick className={styles.tick} /><h3>Deadlines</h3></div>
                    <p>Never miss an important date again.</p>
                </div>
                <div className={styles.taskManagement}>
                    <div className={styles.top}> <TiTick className={styles.tick} /><h3>Secure Access</h3></div>
                    <p>Your data stays private and protected.</p>
                </div>
            </section >

            <section id='about' className={styles.about}>
                <div className={styles.aboutContent}>
                    <h3>About loscar</h3>
                    <p>loscar was built to simplify personal productivity.<br />
                        Whether you're a student, freelancer, or professional,<br />
                        our goal is to help you stay organized, focused and productive.<br />
                        Our clean interface makes it easy to manage
                        tasks, track progress, and stay on top of
                        deadlines—all in one place.
                    </p>

                </div>

            </section>

            <section id='technologies' className={styles.technologies}>
                <h3>Built With:</h3>
                <div className={styles.technologiesMain}>

                    <div className={styles.techCard}>
                        <img src="/react (1).svg" className={styles.react} alt="react" />

                    </div>
                    <div className={styles.techCard}>
                        <img src="nodejs-icon.svg" alt="node" />

                    </div>
                    <div className={styles.techCard}>
                        <img src="/typescript-icon.svg" alt="ts" />

                    </div>
                    <div className={styles.techCard}>
                        <img src="/mongodb-icon.svg" alt="mongodb" />

                    </div>

                </div>


            </section>

            <section id='contact' className={styles.contact}>
                <h2>Have a question?</h2>

                <p>Email: <span>loscarcorp@gmail.com</span></p>

            </section>

            <footer className={styles.footer}>
                <h3>loscar</h3>

                <p>Stay organized. Stay accountable.</p>
                <nav className={styles.footerLinks}>
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                    <a href="#technologies">Technologies</a>
                    <a href="#contact">Contact</a>

                </nav>

                {/* <div className={styles.socials}>
                    <img src="github-icon.svg" alt="node" />
                    <img src="google-gmail.svg" alt="node" />

                </div> */}

                <small>© 2026 loscar. All rights reserved.</small>


            </footer>

        </>



    )
}

export default Home;