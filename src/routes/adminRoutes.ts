import express from "express";
import {authorizeAdmin, authenticateUser} from "../middleware/authMiddleware";
import {getAllAnnualContributions, uploadAnnualContributions} from "../controllers/contribution"
import { getAllUsers } from "../controllers/adminController";

const router = express.Router();

router.post("/upload-excel", authenticateUser, authorizeAdmin, uploadAnnualContributions);
router.get("/get-staff-data", authenticateUser, authorizeAdmin, getAllAnnualContributions);
router.get("/users", getAllUsers);

export default router;