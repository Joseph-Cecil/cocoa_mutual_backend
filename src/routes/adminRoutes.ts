import express from "express";
import {authorizeAdmin, authenticateUser} from "../middleware/authMiddleware";
import {getAllAnnualContributions, uploadAnnualContributions} from "../controllers/contribution"

const router = express.Router();

router.post("/upload-excel", authenticateUser, authorizeAdmin, uploadAnnualContributions);
router.get("/get-staff-data", authenticateUser, authorizeAdmin, getAllAnnualContributions);

export default router;