import express from "express";
import {authorizeAdmin, authenticateUser} from "../middleware/authMiddleware";
import {uploadAnnualContributions} from "../controllers/contribution"

const router = express.Router();

router.post("/upload-excel", authenticateUser, authorizeAdmin, uploadAnnualContributions)

export default router;