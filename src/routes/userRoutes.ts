import express from "express";
import {authenticate, authenticateUser} from "../middleware/authMiddleware";
import { getUserProfile } from "../controllers/userController";

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);

export default router;