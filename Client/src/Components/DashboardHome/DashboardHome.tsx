import styles from "./DashboardHome.module.css";
import { useAuth } from "../../context/AuthContext";
import { IoIosAddCircle } from "react-icons/io";
import { IoCalendarClearOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
// import { FaAngleRight } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import type { Task } from "../../types/auth";
import { useState, useEffect } from "react";






const DashboardHome = () => {
    const { user } = useAuth();

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/tasks/get-tasks`, {
                    credentials: "include"
                }
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch tasks");
                }
                const data: { tasks: Task[] } = await res.json();

                setTasks(data.tasks);
                console.log(data.tasks);

            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [])


    const handleAddTask = async () => {
        if (!newTask.trim()) return

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/tasks/add-tasks`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        title: newTask,
                        category: "Inbox"
                    })
                }
            );

            if (!res.ok) {
                throw new Error("Failed to create task");
            }

            const data = await res.json();
            setTasks((prevTasks) => [data.task, ...prevTasks]);
            setNewTask("");

        } catch (err) {
            console.error(err)
        }


    }

    const toggleTask = async (task: Task) => {
        try {

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/tasks/${task._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        completed: !task.completed
                    })
                }

            );

            if (!res.ok) {
                throw new Error("Failed to update task");
            }

            const data: { task: Task } = await res.json();

            setTasks((prevTasks) =>
                prevTasks.map((item) =>
                    item._id === task._id ? data.task : item)
            );

        } catch (err) {
            console.error(err);
        }
    }



    return (
        <section className={styles.mainSection}>
            {loading && <h1>Loading...</h1>}

            <div className={styles.top}>

                <div className={styles.heading}>
                    <h1>Good Morning, {user?.name}</h1>
                    <span>You have 6 tasks for today</span>
                </div>

                <div className={styles.upNext}>
                    <h3>Up Next</h3>
                    <div className={styles.nextTask}>
                        <p>Design team meeting-Discuss new project product design</p>
                        <span>10:30AM - 11:00AM</span>
                    </div>
                    <div className={styles.nextTask}>
                        <p>Design team meeting-Discuss new project product design</p>
                        <span>11:30AM - 12:00PM</span>
                    </div>
                </div>
            </div>


            {/* add task section */}

            <div className={styles.mainTaskContainer}>

                <div className={styles.addTaskContainer}>

                    <div className={styles.addTaskDiv}>
                        <div className={styles.addTaskWrapper}>
                            <IoIosAddCircle className={styles.addTaskIcon} />
                            <input
                                placeholder="Add task"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddTask();
                                    }
                                }}
                            />
                        </div>
                        <div className={styles.iconContainerDiv}>
                            <button type="button" className={styles.iconDiv}>
                                <IoCalendarClearOutline className={styles.icon} />

                            </button>
                            <button type="button" className={styles.iconDiv}>
                                <GoClock className={styles.icon} />

                            </button>
                        </div>
                    </div>

                    <div className={styles.customDivs}>
                        <div className={styles.custom}>
                            <GoClock />
                            <span>Inbox</span>
                        </div>
                        <div className={styles.custom}>
                            <GoClock />
                            <span>Tomorrow</span>
                        </div>
                        <div className={styles.custom}>
                            <GoClock />
                            <span>Next Week</span>
                        </div>
                        <div className={styles.custom}>
                            <GoClock />
                            <span>Custom</span>
                        </div>
                    </div>
                </div>

                {/* List container */}

                <div className={styles.listContainer}>

                    {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
                    <h2>Today's List</h2>

                    <ul>
                        {tasks.map((task) => (
                            <li key={task._id}>
                                <button
                                    type="button"
                                    onClick={() => toggleTask(task)}
                                    className={`${styles.completeButton} ${task.completed ? styles.completed : ""
                                        }`}
                                >
                                    {task.completed ? "✓" : <FaRegSquare className={styles.listIcon} />}
                                </button>

                                <div className={styles.liDiv}>
                                    <div className={styles.individualLi}>
                                        <h5 className={task.completed ? styles.completedTitle : ""}
                                        >{task.title}</h5>
                                        <span>{task.category}</span>
                                    </div>

                                </div>

                            </li>
                        ))}

                    </ul>

                </div>
            </div>


        </section>
    )


};

export default DashboardHome;