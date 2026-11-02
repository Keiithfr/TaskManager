import { Schema, model } from "mongoose";

const taskSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            default: "Inbox"
        },
        dueDate: {
            type: Date,
            default: null
        },
        dueTime: {
            type: String,
            default: null
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Task = model("Task", taskSchema);

export default Task;