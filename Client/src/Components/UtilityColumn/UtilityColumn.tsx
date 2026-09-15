import styles from './UtilityColumn.module.css'
import Calendar from './calendar/calendar'
import FocusTimer from './focustimer/focustimer'

const UtilityColumn = () => {


    return (

        <section className={styles.utilityColumn}>
            <Calendar />

            <div className={styles.focusTimer}>
                <FocusTimer />
            </div>
        </section>
    )
}

export default UtilityColumn