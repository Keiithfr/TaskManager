import styles from "./DashboardHome.module.css";
import { useAuth } from "../../context/AuthContext";
import { IoIosAddCircle } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { FaAngleRight } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";




const DashboardHome = () => {
    const { user } = useAuth();



    return (
        <section className={styles.mainSection}>

            <div className={styles.top}>

                <div className={styles.heading}>
                    <h1>Good Morning, {user?.name}</h1>
                    <span>You have 6 tasks for today</span>
                </div>

                <div className={styles.upNext}>
                    <h3>Up Next</h3>
                    <div className={styles.nextTask}>
                        <p>Design team meeting-Discuss new project product design</p>
                        <span>10:30AM - 11:00AM</span>
                    </div>
                    <div className={styles.nextTask}>
                        <p>Design team meeting-Discuss new project product design</p>
                        <span>11:30AM - 12:00PM</span>
                    </div>
                </div>
            </div>


            {/* add task section */}

            <div className={styles.mainTaskContainer}>

                <div className={styles.addTaskContainer}>

                    <div className={styles.addTaskDiv}>
                        <div className={styles.addTaskWrapper}>
                            <IoIosAddCircle className={styles.addTaskIcon} />
                            <input
                                placeholder="Add task"
                            />
                        </div>
                        <div className={styles.iconContainerDiv}>
                            <button type="button" className={styles.iconDiv}>
                                <IoCalendarClearOutline className={styles.icon} />

                            </button>
                            <button type="button" className={styles.iconDiv}>
                                <GoClock className={styles.icon} />

                            </button>
                        </div>
                    </div>

                    <div className={styles.customDivs}>
                        <div className={styles.custom}>
                            <GoClock />
                            <span>Inbox</span>
                        </div>
                        <div className={styles.custom}>
                            <GoClock />
                            <span>Tomorrow</span>
                        </div>
                        <div className={styles.custom}>
                            <GoClock />
                            <span>Next Week</span>
                        </div>
                        <div className={styles.custom}>
                            <GoClock />
                            <span>Custom</span>
                        </div>
                    </div>
                </div>

                {/* List container */}

                <div className={styles.listContainer}>
                    <h2>Today's List</h2>

                    <ul>
                        <li>
                            <FaRegSquare className={styles.listIcon} />
                            <div className={styles.liDiv}>
                                <div className={styles.individualLi}>
                                    <h5>Study</h5>
                                    <span>Inbox</span>
                                </div>
                                <button className={styles.liButton}>
                                    <span>9:30AM</span>
                                    <FaAngleRight />
                                </button>
                            </div>
                        </li>
                        <li>
                            <FaRegSquare className={styles.listIcon} />
                            <div className={styles.liDiv}>
                                <div className={styles.individualLi}>
                                    <h5>Client meeting preparation</h5>
                                    <span>Work</span>
                                </div>
                                <button className={styles.liButton}>
                                    <span>11:30AM</span>
                                    <FaAngleRight />
                                </button>
                            </div>
                        </li>
                        <li>
                            <FaRegSquare className={styles.listIcon} />
                            <div className={styles.liDiv}>
                                <div className={styles.individualLi}>
                                    <h5>Health care</h5>
                                    <span>Inbox</span>
                                </div>
                                <button className={styles.liButton}>
                                    <span>14:30PM</span>
                                    <FaAngleRight />
                                </button>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>



        </section>
    )


};

export default DashboardHome;