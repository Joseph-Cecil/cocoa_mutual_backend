import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "user" | "admin";
    staffId?: number;
  };
}
