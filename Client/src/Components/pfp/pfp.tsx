import styles from "./pfp.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Pfp = () => {

    const { user}  = useAuth();
    const navigate = useNavigate()


 
    return (
        <section className={styles.pfpSection}>
            <div className={styles.pfpdiv}
                onClick={() => navigate("/edit-profile")}>
                <img src={user?.profileImage} alt="Profile" />
             
            </div>

        </section>
    )
}

export default Pfp;