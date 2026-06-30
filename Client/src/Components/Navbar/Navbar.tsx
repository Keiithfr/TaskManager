import { FaTasks } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <nav className={styles.navbar}>
            <div className={styles.logodiv}>
                <FaTasks className={styles.logo} />
                <span>Loscar</span>
            </div>
            <div className={styles.actionsdiv}>
                <Link to="/login" className={styles.Link}>Log in</Link>
                <Link to="/signup" className={styles.Link}>Sign up</Link>


            </div>

        </nav>
    )
}
export default Navbar