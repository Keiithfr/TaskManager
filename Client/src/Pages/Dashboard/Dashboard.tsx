import styles from './Dashboard.module.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import DashboardHome from '../../Components/DashboardHome/DashboardHome';
import UtilityColumn from '../../Components/UtilityColumn/UtilityColumn';

const Dashboard = () => {
    return (
        <section className={styles.dashboard}>
            <Sidebar />

            <main className={styles.mainContent}>
                {/* dashboard */}
                <DashboardHome />
            </main>
            <UtilityColumn />
        </section>
    );
};

export default Dashboard;