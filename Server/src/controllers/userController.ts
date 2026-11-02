import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import { User } from "../models/User.js";




export const saveChanges = async (
    req: Request,
    res: Response
) => {

    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Kindly log in"
            })
        }
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User account does not exist"
            })
        }

        //object destructring
        const { name, removePhoto } = req.body;
        const shouldRemovePhoto = removePhoto === "true"; //since in form data ordinary fields are transmitted as strings

        if (req.file && shouldRemovePhoto) {
            return res.status(400).json({
                message: "You cannot upload and remove a photo at the same time."
            });
        }

        //did the name change?
        let nameChanged = false;

        if (typeof name === "string") {
            const trimmedName = name.trim();

            if (!trimmedName) {
                return res.status(400).json({
                    message: "Name cannot be empty."
                })
            }

            nameChanged = trimmedName !== user.name
        }


        const photoChanged = Boolean(req.file) ||
            (shouldRemovePhoto && Boolean(user.profileImage));

        if (!nameChanged && !photoChanged) {
            return res.status(400).json({
                message: "No changes to save."
            });
        }

        const oldImageUrl = user.profileImage;

        if (nameChanged) {
            user.name = name.trim();
        }

        let photoToDelete: string | null = null;

        if (req.file) {
            const result = await new Promise<{ secure_url: string; public_id: string }>(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "task-manager/profile-images",
                            resource_type: "image",
                        },
                        (error, result) => {
                            if (error) {
                                reject(error)
                            } else if (!result) {
                                reject(new Error("Cloudinary returned no result"));
                            } else {
                                resolve(result as { secure_url: string; public_id: string });
                            }
                        }
                    );
                    uploadStream.end(req.file!.buffer)
                });

            user.profileImage = result.secure_url;
            user.profileImagePublicId = result.public_id;
        } else if (shouldRemovePhoto) {
            photoToDelete = user.profileImagePublicId ?? null;

            user.profileImage = null;
            user.profileImagePublicId = null;

        }

        await user.save();

        if (photoToDelete) {
            try {
                const result = await cloudinary.uploader.destroy(photoToDelete);

                if (result.result !== "ok" && result.result !== "not found") {
                    console.error("Cloudinary deletion failed:", result.result);
                }
            } catch (error) {
                console.error("Failed to delete profile photo from Cloudinary:", error);
            }
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage ?? null,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to update profile",
        });
    }

};