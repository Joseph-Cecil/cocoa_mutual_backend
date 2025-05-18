import express from "express";
import {authorizeAdmin, authenticateUser} from "../middleware/authMiddleware";
import {getAllAnnualContributions, uploadAnnualContributions} from "../controllers/contribution"
import { deleteUser, getAllUsers } from "../controllers/adminController";

const router = express.Router();

router.post("/upload-excel", authenticateUser, authorizeAdmin, uploadAnnualContributions);
router.get("/users", authenticateUser, authorizeAdmin, getAllUsers );
router.get("/get-staff-data", authenticateUser, authorizeAdmin, getAllAnnualContributions);
router.delete("/user/:id", authenticateUser, authorizeAdmin, deleteUser);


export default router;