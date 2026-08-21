import styles from './Home.module.css'
import { FaTasks } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { FaHourglassHalf } from "react-icons/fa";
import { IoIosRadioButtonOff } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LuAlarmClock } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import Contact from '../contact/contact';

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

            <section id='home' className={styles.hero}>
                <div className={styles.heroContent}>


                    <div className={styles.logodiv}>
                        <FaTasks className={styles.logo} />
                    </div>

                    <h1>
                        Think,plan, and track
                    </h1>
                    <h2>
                        all in one place
                    </h2>


                    <p className={styles.heroDescription}>Manage your tasks, track your progress, and never miss a deadline
                        -all in one simple workspace.
                    </p>

                    <div className={styles.buttonsDiv}>
                        <button onClick={handleGetStarted}>Get Started</button>
                        <button onClick={handleLogIn}>{user ? "Dashboard" : "Sign In"}</button>
                    </div>



                </div>



                <div className={styles.integrations}>
                    <p>100+ integrations</p>
                    <div className={styles.icons}>

                        <div className={`${styles.icon} ${styles.gmail}`}>
                            <img src='/google-gmail.svg' alt='google-gmail' />
                        </div>
                        <div className={`${styles.icon} ${styles.zoom}`}>
                            <img src='/zoom-icon.svg' alt='zoom-icon' />
                        </div>
                        <div className={`${styles.icon} ${styles.calendar}`}>
                            <img src='/google-calendar.svg' alt='google-calendar' />
                        </div>
                    </div>
                </div>

                <div className={styles.reminders}>
                    <div className={styles.clockdiv}>
                        <LuAlarmClock className={styles.clockimg} />
                    </div>
                    <div className={styles.reminderinfo}>
                        <p className={styles.p1}>Reminders</p>
                        <div className={styles.meetings}><p>Meetings</p></div>
                        <div className={styles.meetingsinfo}>
                            <p className={styles.p2}>Today's Meeting</p>
                            <span className={styles.p3}>Call with marketing team.</span>
                            <div className={styles.timediv}>
                                <p>Time</p>
                                <div className={styles.time}>
                                    <FiClock className={styles.ficlock} /> <p>13:00-13:45</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={styles.transparentdiv}></div>

                </div>

                <div className={styles.notes}>
                    <p>Take notes to keep <br /> track of crucial details,<br />
                        and accomplish more <br /> tasks with ease.</p>
                </div>
                <div className={styles.transparentdiv2}>
                    <div className={styles.checkboxdiv}>

                    </div>

                </div>

                <div className={styles.taskCard}>
                    <h3>Today's tasks</h3>

                    <div className={styles.task}>
                        <div className={styles.details}>
                            <div className={styles.left}>
                                <span className={`${styles.dot} ${styles.red}`}></span>
                                <p style={{ fontWeight: "500" }}>New ideas for campaign</p>
                            </div>

                            <div className={styles.avatars}>
                                <img src='/user1.jpg'></img>
                                <img src='/user2.jpg'></img>
                            </div>
                        </div>

                        <div className={styles.progress}>

                            <small style={{ color: "gray", fontWeight: "500" }}>Sep 15</small>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.fill}
                                    style={{ width: "60%" }} ></div>
                            </div>
                            <small style={{ fontWeight: "500" }}>60%</small>
                        </div>




                        <div className={styles.task}>
                            <div className={styles.details}>
                                <div className={styles.left}>
                                    <span className={`${styles.dot} ${styles.green}`}></span>
                                    <p style={{ fontWeight: "500" }}>Design PPT #4</p>
                                </div>
                                <div className={styles.avatars}>
                                    <img src='/user3.jpg'></img>
                                    <img src='/user4.jpg'></img>
                                </div>
                            </div>
                            <div className={styles.progress}>
                                <small style={{ color: "gray", fontWeight: "500" }}>Sep 18</small>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.fill}
                                        style={{ width: "80%" }} ></div>


                                </div>
                                <small style={{ fontWeight: "500" }}>80%</small>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section id='features' className={styles.features}>
                <div className={styles.featuresHeading}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>  <CiSettings /> <span style={{ fontSize: "small", fontWeight: "var(--weight-bold)" }}>BUILT IN TOOLS</span></div>
                    <h2>An entire stack of features that keep<br /> your <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "6px",
                            border: "1px solid orange",
                            borderRadius: "12px",
                        }}
                    >
                        <GoSun
                            style={{
                                color: "orange",
                                fontSize: "26px",
                            }}
                        />
                    </span>  day moving</h2>
                </div>

                <div className={styles.featuresGrid}>
                    <div className={styles.featuresCard}>
                        <div className={styles.top}>
                            <h2>Task Management</h2>
                            <p>Create, organize and prioritize everything
                                you need to accomplish in one place.</p>
                        </div>

                        <div className={styles.addTask}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", background: "green", padding: "4px" }}><FaPlus style={{ color: "white" }} /></div>
                            <div>  <p style={{ color: "gray", fontSize: "10px", fontWeight: "bold" }}>add task...</p>
                            </div>


                        </div>
                        <div className={styles.cardDescription}>
                            <div className={styles.individualTask}><TiTick style={{ color: "green" }} />
                                <span style={{ fontSize: "small", color: "var(--dark-txt)", fontWeight: "var(--weight-bold)" }}>Finish portfolio</span>
                            </div>
                            <div className={styles.individualTask}><IoIosRadioButtonOff style={{ fontSize: "10px" }} />
                                <span style={{ fontSize: "small", color: "var(--dark-txt)", fontWeight: "var(--weight-bold)" }}>Study React</span>
                            </div>
                            <div className={styles.individualTask}><TiTick style={{ color: "green" }} />
                                <span style={{ fontSize: "small", color: "var(--dark-txt)", fontWeight: "var(--weight-bold)" }}>Gym</span>
                            </div>
                            <div className={styles.individualTask}><IoIosRadioButtonOff style={{ fontSize: "10px" }} />
                                <span style={{ fontSize: "small", color: "var(--dark-txt)", fontWeight: "var(--weight-bold)" }}>Grocery shopping</span>
                            </div>

                        </div>



                    </div>
                    <div className={styles.featuresCard}>

                        <div className={styles.top}>
                            <h2>Progress Tracking</h2>
                            <p>Monitor completed and pending tasks.</p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 12px 20px rgba(0,0,0,.2)", padding: "var(--space-md)", borderRadius: "12px", right: "28%", position: "absolute", bottom: "38%" }}>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.fill}
                                    style={{ width: "80%" }} ></div>
                            </div>
                            <p>16/20 tasks completed </p>
                        </div>

                        <div style={{ padding: "24px", borderRadius: "24px", display: "flex", flexDirection: "column", gap: "10px", boxShadow: "0 12px 20px rgba(0,0,0,.2)", alignItems: "center", justifyContent: "center", right: "5%", position: "absolute", bottom: "5%" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "10px auto 1fr", alignItems: "center", columnGap: "3px" }}>
                                <TiTick style={{ color: "green" }} />
                                <span>Completed</span>
                                <span style={{ marginLeft: "10px" }}>16</span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "10px auto 1fr", alignItems: "center", columnGap: "5px" }}>
                                <FaHourglassHalf style={{ color: "green" }} />
                                <span>Pending</span>
                                <span style={{ marginLeft: "10px" }}>4</span>
                            </div>

                        </div>



                    </div>
                    <div className={styles.featuresCard}>


                        <div className={styles.top}>
                            <h2>Deadlines</h2>
                            <p>Never miss an important date again.</p>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", padding: "24px", width: "80%", boxShadow: "0 12px 20px rgba(0,0,0,.2)", borderRadius: "24px", gap: "12px" }}>
                            <div style={{ display: "grid", gridTemplateColumns: "10px auto 1fr", alignItems: "center", columnGap: "10px" }}>
                                <FiClock style={{ color: "blue" }} /> <span style={{ color: "blue" }} >9:00</span>
                                <p style={{ marginLeft: "16px", color: "gray" }}>Team meeting</p>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "10px auto 1fr", alignItems: "center", columnGap: "10px" }}>
                                <FiClock style={{ color: "blue" }} /> <span style={{ color: "blue" }} >14:00</span>
                                <p style={{ marginLeft: "16px", color: "gray" }}>Submit Report</p>

                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "10px auto 1fr", alignItems: "center", columnGap: "10px" }}>
                                <FiClock style={{ color: "blue" }} /> <span style={{ color: "blue" }} >18:00</span>
                                <p style={{ marginLeft: "16px", color: "gray" }}>Workout</p>
                            </div>


                        </div>



                    </div>


                </div>
            </section >


            <section id='about' className={styles.aboutSection}>

                <div className={styles.about}>
                    <div className={styles.aboutContent}>
                        <h3>How it Started</h3>
                        <h2>Our Dream is  Personal Productivity on a Global Scale</h2>
                        <p>loscar was built to simplify personal productivity.
                            Whether you're a student, freelancer, or professional,
                            our goal is to help you stay organized, focused and productive.
                            Our clean interface makes it easy to manage
                            tasks, track progress, and stay on top of
                            deadlines—all in one place.
                        </p>

                    </div>

                    <div className={styles.aboutShowCase}>
                        <div className={styles.aboutImgDiv}>
                            <img src='/work.jpg' />
                        </div>
                        <div className={styles.aboutStats}>
                            <div className={styles.individualStats}>
                                <h3>3.5</h3> <span>Years Experience</span>
                            </div>
                            <div className={styles.individualStats}>
                                <h3>23</h3> <span>Project:Challenge</span>
                            </div>
                            <div className={styles.individualStats}>
                                <h3>830+</h3> <span>Positive reviews</span>
                            </div>
                            <div className={styles.individualStats}>
                                <h3>100K</h3> <span>Trusted Users</span>
                            </div>
                        </div>

                    </div>

                </div>

            </section>

            <section id='technologies' className={styles.technologies}>
                <h3>Built With:</h3>
                <div className={styles.technologiesMain}>

                    <div className={styles.techCard}>
                        <img src="/react (1).svg" className={styles.react} alt="react" />
                        <h4>react</h4>

                    </div>
                    <div className={styles.techCard}>
                        <img src="nodejs-icon.svg" alt="node" />
                        <h4>node</h4>

                    </div>
                    <div className={styles.techCard}>
                        <img src="/typescript-icon.svg" alt="ts" />
                        <h4>ts</h4>

                    </div>
                    <div className={styles.techCard}>
                        <img src="/mongodb-icon.svg" alt="mongodb" />
                        <h4>MongoDB</h4>

                    </div>

                </div>


            </section>

            <section id='contact'>
                <Contact />


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

                <div className={styles.socials}>
                    <a href="https://github.com/..." aria-label="GitHub">
                        <img src="github-icon.svg" alt="" />
                    </a>

                    <a href="mailto:loscarcorp600@gmail.com" aria-label="Email us">
                        <img src="google-gmail.svg" alt="" />
                    </a>
                </div>



                <small>© 2026 loscar. All rights reserved.</small>


            </footer>



        </>



    )
}

export default Home;