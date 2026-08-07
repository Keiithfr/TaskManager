import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,

    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
},

    {
        timestamps: true,
    }
);

export const Contact = model("Contact", contactSchema);