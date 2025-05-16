import {Request, Response} from "express";
import User from "../models/user";
import { sanitizeUserData } from "../utils/sanitizeUserData";
import AnnualContribution from "../models/contribution";


//GEt user profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ message: "Unauthorized access." });
        return;
      }
  
      const user = await User.findById(req.user.id).select("-password"); // Exclude password from the result
  
      // Check if the user exists
      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }
  
      // Sanitize the user data to expose only necessary fields
      const sanitizedUserData = sanitizeUserData(user);
  
      // Send the sanitized data as the response
      res.status(200).json(sanitizedUserData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Internal server error. Please try again later." });
    }
  };

  export const getUserContributionData = async(req: Request, res:Response) => {
    try {
      if(!req.user || !req.user.id) {
        return res.status(401).json({message: "Unauthorized Access"})
      }

      const staffData = await AnnualContribution.findOne({staffId: req.user.staffId})

      if(!staffData){
        return res.status(404).json({message: "Staff Data Not Found"})
      }

      return res.status(200).json(staffData);
    } catch (error) {
      console.error("Error Fetching User Data ", error);
      return res.status(500).json({message: " Internal Server Error, Please Try Again Later"});
    }
  }
  