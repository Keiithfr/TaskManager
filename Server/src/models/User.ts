import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,

    },
    profileImage: {
        type: String,
        default: null,

    },
    profileImagePublicId: {
        type: String,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null

    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
},

    {
        timestamps: true,
    }
);

export const User = model("User", userSchema);