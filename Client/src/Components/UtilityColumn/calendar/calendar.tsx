import styles from "./calendar.module.css";
import { useState } from "react";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";






const Calendar = () => {

    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);

    const previousMonth = () => {
        setCurrentDate(
            new Date(year, currentMonth - 1, 1)
        );
    };
    const nextMonth = () => {
        setCurrentDate(
            new Date(year, currentMonth + 1, 1)
        );
    };


    const month = currentDate.toLocaleString("default", {
        month: "long",
    });
    const year = currentDate.getFullYear();

    const currentMonth = currentDate.getMonth();

    const daysInMonth = new Date(
        year,
        currentMonth + 1,
        0
    ).getDate();

    const firstDay = new Date(
        year,
        currentMonth,
        1
    ).getDay();

    const days = [];

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    }

    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    return (
        <section className={styles.calendar}>
            <div className={styles.header}>
                <button onClick={previousMonth}><LiaAngleLeftSolid /></button>
                <div>
                    <h2>{month}</h2>
                    <p>{year}</p>
                </div>

                <button onClick={nextMonth}><LiaAngleRightSolid /></button>

            </div>
            <div className={styles.weekdays}>
                {weekdays.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>
            <div className={styles.grid}>
                {days.map((day, index) => {
                    const isToday =
                        day === todayDate &&
                        currentMonth === todayMonth &&
                        year === todayYear;

                    return (
                        <div
                            key={index}
                            className={`${styles.day} ${isToday ? styles.today : ""
                                }`}
                        >{day}</div>
                    )

                }

                )}
            </div>

        </section>
    );
};

export default Calendar;