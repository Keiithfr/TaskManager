import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { BiHomeAlt } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { IoBriefcaseOutline } from "react-icons/io5";
import { MdOutlineDesignServices } from "react-icons/md";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { useSidebar } from "../../context/SidebarContext";

const Sidebar = () => {

    const { logout } = useAuth()
    const navigate = useNavigate();

    const { sidebarOpen, closeSidebar } = useSidebar();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <>

            {sidebarOpen && (
                <div
                    className={styles.sidebarOverlay}
                    onClick={closeSidebar}
                />
            )}
            <section className={`${styles.sidebarSection} ${sidebarOpen ? styles.sidebarOpen : ""
                }`}>
                <div className={styles.sidebarTop}>
                    <div className={styles.dashboardDiv}>
                        <BiHomeAlt className={styles.sidebarIcon} />
                        <h5>Dashboard</h5>
                    </div>
                    <div className={styles.dashboardDiv}>
                        <FaRegCheckCircle className={styles.sidebarIcon} />
                        <h5>List</h5>
                    </div>
                    <div className={styles.dashboardDiv}>
                        <IoCalendarClearOutline className={styles.sidebarIcon} />
                        <h5>Calendar</h5>
                    </div>
                    <div className={styles.dashboardDiv}>
                        <MdOutlineMail className={styles.sidebarIcon} />
                        <h5>Messages</h5>
                    </div>
                </div>

                <div className={styles.sidebarMiddle}>
                    <div className={styles.sidebarList}>
                        <p>My list</p>
                        <button className={styles.addButton}>+</button>
                    </div>

                    <div className={styles.sidebarListItems}>
                        <ul>
                            <li>
                                <div className={styles.liWrapper}>
                                    <IoBriefcaseOutline className={styles.sidebarIcon} />
                                    <h5>Work</h5>

                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className={styles.sidebarBottom}>
                    <div className={styles.sidebarList}>
                        <p>Workplace</p>
                        <button className={styles.addButton}>+</button>
                    </div>

                    <div className={styles.sidebarWorkplaceItems}>
                        <ul>
                            <li>
                                <div className={styles.liWrapper}>
                                    <MdOutlineDesignServices className={styles.sidebarIcon} />
                                    <h5>UI Design</h5>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <button
                    className={styles.logoutMain}
                    onClick={handleLogout}
                >
                    <LiaDoorOpenSolid className={styles.logoutDoor} />
                    <span>Logout</span>
                </button>






            </section>


        </>
    )

}

export default Sidebar;