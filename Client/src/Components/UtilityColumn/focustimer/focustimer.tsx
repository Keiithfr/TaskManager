import { useEffect, useState } from 'react';
import styles from './focustimer.module.css'
import { GrSubtract } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import { IoPlayOutline } from "react-icons/io5";
import { IoPauseOutline } from "react-icons/io5";
import { IoRefreshOutline } from 'react-icons/io5';


const DEFAULT_TIME = 30 * 60;





const FocusTimer = () => {

    const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_TIME);
    const [isRunning, setIsRunning] = useState(false);

    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setRemainingSeconds((prev) => {
                if (prev <= 1) {
                    setIsRunning(false);
                    setIsComplete(true);
                    return 0;
                }

                return prev - 1

            });
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning]);

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    const increaseTime = () => {
        if (!isRunning) {
            setRemainingSeconds((prev) => prev + 5 * 60);

        }
    };

    const decreaseTime = () => {
        if (!isRunning && remainingSeconds > 5 * 60) {
            setRemainingSeconds((prev) => prev - 5 * 60)
        }
    };

    const toggleTimer = () => {
        if (remainingSeconds === 0) return;

        setIsComplete(false);
        setIsRunning((prev) => !prev);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setIsComplete(false);
        setRemainingSeconds(DEFAULT_TIME);
    }



    return (
        <section className={styles.timerSection}>
            <div className={styles.header}>
                <h3>Focus timer</h3>
                <option></option>
            </div>
            <div className={styles.timerBody}>
                <div className={styles.timer}>
                    <button className={styles.iconDiv}
                        onClick={decreaseTime}
                        disabled={isRunning}
                    >
                        <GrSubtract className={styles.icon} />
                    </button>
                    <h3>
                        {String(minutes).padStart(2, '0')}:
                        {String(seconds).padStart(2, '0')}
                    </h3>


                    <button className={styles.iconDiv}
                        onClick={increaseTime}
                        disabled={isRunning}
                    >
                        <GrAdd className={styles.icon} />
                    </button>
                </div>
                <div className={styles.controls}>
                    <button className={styles.start}
                        onClick={toggleTimer}
                        disabled={isComplete}>
                        <span>{isRunning ? 'Pause' :isComplete? 'Done': 'Start'}</span>
                        <div className={styles.playDiv}>

                            {isRunning ? (
                                <IoPauseOutline className={styles.icon} />
                            ) : <IoPlayOutline className={styles.icon} />}

                        </div>

                    </button>
                    <button
                        className={styles.resetDiv}
                        onClick={resetTimer}
                    >

                        <IoRefreshOutline className={styles.icon} />
                        <span>Reset</span>

                    </button>
                </div>
            </div>

            {isComplete && (
                <p className={styles.completeMessage}>
                    Focus session complete!
                </p>
            )}

        </section>


    )

}

export default FocusTimer