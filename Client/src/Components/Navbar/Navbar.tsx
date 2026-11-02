import { FaTasks } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { useSidebar } from "../../context/SidebarContext";
import Pfp from "../pfp/pfp";


const Navbar = () => {

    const { user } = useAuth()
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { toggleSidebar, sidebarOpen } = useSidebar();

    const [searchTerm, setSearchTerm] = useState("");

    const handleMenuLinkClick = () => {
        setMenuOpen(false);
    };


    const handleLogIn = () => {
        navigate(user ? "/dashboard" : "/login")
    }

    const location = useLocation();
    const isLandingPage = location.pathname === "/"

    const handleLogo = () => {
        if (user) {
            navigate("/dashboard");
        } else {
            navigate("/")
        }
    };




    return (
        <nav className={styles.navbar}>
            <div className={styles.logodiv}>
                <FaTasks className={styles.logo} onClick={handleLogo} />
                <span>loscar</span>
            </div>

            {
                user ? (
                    <>

                        <section className={styles.navbarSection}>

                            <div className={styles.searchTaskDiv}>
                                <div className={styles.searchTaskWrapper}>
                                    <CiSearch className={styles.searchIcon} />
                                    <input
                                        type="text"
                                        placeholder="Search task"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />

                                </div>
                            </div>

                            <button
                                className={styles.menuButton}
                                onClick={toggleSidebar}
                                aria-label="Toggle sidebar">
                                {sidebarOpen ? <FiX /> : <FiMenu />}
                            </button>
                            <div className={styles.notificationDiv}>
                                <IoIosNotifications className={styles.notificationIcon} />
                            </div>
                            <Pfp />


                        </section>

                    </>)
                    : (!user && isLandingPage && (
                        <>

                            <div className={`${styles.actionsdiv} ${menuOpen ? styles.menuOpen : ""
                                }`}>
                                <a href="#home" className={styles.Link} onClick={handleMenuLinkClick}>Home</a>
                                <a href="#features" className={styles.Link} onClick={handleMenuLinkClick}>Features</a>
                                <a href="#about" className={styles.Link} onClick={handleMenuLinkClick}>About</a>
                                <a href="#technologies" className={styles.Link} onClick={handleMenuLinkClick}>Technologies</a>
                                <a href="#contact" className={styles.Link} onClick={handleMenuLinkClick}>Contact</a>

                                <div className={styles.btndiv}>
                                    <button onClick={handleLogIn}>Sign In</button>
                                </div>

                            </div>
                            <button className={styles.menuButton}
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle navigation menu">
                                {menuOpen ? <FiX /> : <FiMenu />}
                            </button>







                        </>)

                    )}

        </nav>
    )
}
export default Navbar