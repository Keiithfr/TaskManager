import { FaTasks } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {

    return (
        <nav className={styles.navbar}>
            <div className={styles.logodiv}>
                <FaTasks className={styles.logo} />
                <span>Loscar</span>
            </div>
            <div className={styles.actionsdiv}>
                <button>Log in</button>

            </div>

        </nav>
    )
}
export default Navbar