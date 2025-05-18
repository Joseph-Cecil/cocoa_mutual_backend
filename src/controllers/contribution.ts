// controllers/annualContributionController.ts

import { Request, Response } from "express";
import AnnualContribution from "../models/contribution";

export const uploadAnnualContributions = async (req: Request, res: Response) => {
  try {
    const workbookData: Record<string, unknown[]> = req.body; 
    const staffDataArray = req.body; 

    if (!workbookData || typeof workbookData !== "object") {
      return res.status(400).json({ message: "Invalid or empty data." });
    }

    const months = [
      " Jan ", " Feb ", " Mar ", " Apr ", " May ", " Jun ",
      " Jul ", " Aug ", " Sep ", " Oct ", " Nov ", " Dec "
    ];

    const operations = staffDataArray.map(async (data: any) => {
      const staffId = data["ID"]?.toString().trim();
      const name = data["Name"]?.trim();

      if (!staffId || !name) return null;

// Initialize monthly data
const monthly: Record<string, number> = {};

// Clean up Excel headers and remove spaces
const excelHeaders = Object.keys(data).map((header) =>
  header.replace(/[\u200B-\u200D\uFEFF]/g, "").trim()
);

// Mapping headers dynamically
const monthsMap: Record<string, string> = {
  Jan: excelHeaders.find((header) => header.toLowerCase().includes("jan")) || "Jan",
  Feb: excelHeaders.find((header) => header.toLowerCase().includes("feb")) || "Feb",
  Mar: excelHeaders.find((header) => header.toLowerCase().includes("mar")) || "Mar",
  Apr: excelHeaders.find((header) => header.toLowerCase().includes("apr")) || "Apr",
  May: excelHeaders.find((header) => header.toLowerCase().includes("may")) || "May",
  Jun: excelHeaders.find((header) => header.toLowerCase().includes("jun")) || "Jun",
  Jul: excelHeaders.find((header) => header.toLowerCase().includes("jul")) || "Jul",
  Aug: excelHeaders.find((header) => header.toLowerCase().includes("aug")) || "Aug",
  Sep: excelHeaders.find((header) => header.toLowerCase().includes("sep")) || "Sep",
  Oct: excelHeaders.find((header) => header.toLowerCase().includes("oct")) || "Oct",
  Nov: excelHeaders.find((header) => header.toLowerCase().includes("nov")) || "Nov",
  Dec: excelHeaders.find((header) => header.toLowerCase().includes("dec")) || "Dec",
};

// Loop through the months
Object.keys(monthsMap).forEach((month) => {
  const header = monthsMap[month];

  // Remove commas, trim spaces, and convert to number
  const rawValue = data[header];

  if (rawValue !== undefined && rawValue !== "-" && rawValue !== "") {
    const formattedValue = rawValue.toString().replace(/,/g, "").trim();
    monthly[month] = Number(formattedValue) || 0;
  } else {
    monthly[month] = 0;
  }
});
      const openingBalance = Number(data[" Balance as at 1/04/25 "]) || 0;
      const total = Object.values(monthly).reduce((acc, val) => acc + val, 0);
      const closingBalance = Number(data[" Total  Balance as at 31/12/2024 "]) || 0;
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
