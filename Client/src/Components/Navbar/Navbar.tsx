import { FaTasks } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {

    const { user, logout, } = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    const handleLogIn = () => {
        navigate(user ? "/dashboard" : "/login")
    }

    const location = useLocation();
    const isLandingPage = location.pathname === "/"




    return (
        <nav className={styles.navbar}>
            <div className={styles.logodiv}>
                <FaTasks className={styles.logo} />
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
                    : (isLandingPage && (
                        <>

                            <div className={styles.actionsdiv}>
                                <a href="#home" className={styles.Link}>Home</a>
                                <a href="#features" className={styles.Link}>Features</a>
                                <a href="#about" className={styles.Link}>About</a>
                                <a href="#technologies" className={styles.Link}>Technologies</a>
                                <a href="#contact" className={styles.Link}>Contact</a>

                            </div>

                            <div className={styles.btndiv}>
                                <button onClick={handleLogIn}>Sign In</button>
                            </div>





                        </>)

                    )}

        </nav>
    )
}
export default Navbar