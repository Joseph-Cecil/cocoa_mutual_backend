import express from "express";
import {authenticate, authenticateUser} from "../middleware/authMiddleware";
import { getStaffData, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);
router.get("/staff-data", getStaffData);

export default router;