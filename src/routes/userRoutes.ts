import express from "express";
import {authenticate, authenticateUser} from "../middleware/authMiddleware";
import { getUserContributionData, getUserProfile } from "../controllers/userController";

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);
router.get("/staff-data", authenticate, getUserContributionData )

export default router;