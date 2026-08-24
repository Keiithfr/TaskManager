import { FaTasks } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {

    const { user, logout, } = useAuth()
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuLinkClick = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
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
                        <div className={styles.actionsdiv}>
                            <span className={styles.span}>Logged in as</span>
                            <p>{user.name}</p>
                        </div>
                        <div className={styles.btndiv}>
                            <button onClick={handleLogout}>Logout</button>
                        </div>

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