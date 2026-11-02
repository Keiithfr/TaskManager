import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import updload from "../middleware/upload.js";
// import { uploadProfilePhoto } from "../controllers/userController.js";
// import { removeProfilePhoto } from "../controllers/userController.js";
import { saveChanges } from "../controllers/userController.js";

const router = Router();

// router.post(
//     "/profile-photo",
//     authMiddleware,
//     updload.single("profileImage"),
//     uploadProfilePhoto
// )

// router.delete(
//     "/remove-profile-photo",
//     authMiddleware,
//     removeProfilePhoto

// )

router.post(
    "/save-changes",
    authMiddleware,
    updload.single("profileImage"),
    saveChanges
)

export default router;