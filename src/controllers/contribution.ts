// controllers/annualContributionController.ts

import { Request, Response } from "express";
import AnnualContribution from "../models/contribution";

export const uploadAnnualContributions = async (req: Request, res: Response) => {
  try {
    const contributionsArray = req.body; // Should be an array of rows from Excel

    if (!Array.isArray(contributionsArray) || contributionsArray.length === 0) {
      return res.status(400).json({ message: "No data received or invalid format." });
    }

    const operations = contributionsArray.map(async (data: any) => {
      const staffId = data["ID"]?.toString().trim();
      const name = data["Name"]?.trim();

      if (!staffId || !name) return null;

      const months = [
        "24-Jan", "24-Feb", "24-Mar", "24-Apr", "24-May", "24-Jun",
        "24-Jul", "24-Aug", "24-Sep", "24-Oct", "24-Nov", "24-Dec"
      ];

      const monthly: Record<string, number> = {};
      months.forEach((month) => {
        monthly[month] = Number(data[month]) || 0;
      });

      const openingBalance = Number(data["Balance as at 1/04/24"]) || 0;
      const total = Object.values(monthly).reduce((acc, val) => acc + val, 0);
      const closingBalance = Number(data[" Total  Balance as at 31/12/2024"]) || 0;
      const interestPaid = Number(data[" Interest Paid "]) || 0;
      const balanceAfterInterest = Number(data[" Balance after Interest "]) || 0;
      const withdrawal = Number(data[" Withdrawal "]) || 0;
      const carryForwardBalance = Number(data[" Balance as at 1/01/2025 "]) || 0;

      return AnnualContribution.findOneAndUpdate(
        { staffId, year: "2024" },
        {
          staffId,
          name,
          openingBalance,
          monthly,
          total,
          closingBalance,
          interestPaid,
          balanceAfterInterest,
          withdrawal,
          carryForwardBalance,
          year: "2024",
        },
        { upsert: true, new: true }
      );
    });

    await Promise.all(operations);

    res.status(200).json({ message: "Annual contributions uploaded successfully." });
  } catch (error) {
    console.error("Error uploading contributions:", error);
    res.status(500).json({ message: "Error processing contributions.", error });
  }
};

export const getAllAnnualContributions = async (req: Request, res: Response) => {
  try {
    const contributions = await AnnualContribution.find();

    if (!contributions.length) {
      return res.status(404).json({ message: "No contributions found." });
    }

    res.status(200).json(contributions);
  } catch (error) {
    console.error("Error fetching contributions:", error);
    res.status(500).json({ message: "Error retrieving contributions.", error });
  }
};
