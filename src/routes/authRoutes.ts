import express from "express";
import { registerUser, loginUser, changePassword, resetPassword } from "../controllers/authController";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register",  registerUser); // Only admins can register users
router.post("/login", loginUser);
router.put("/change-password", authenticateUser, changePassword);
router.put("/reset-password", authenticateUser, authorizeAdmin, resetPassword); // Reset Password (Admin Only)

export default router;
