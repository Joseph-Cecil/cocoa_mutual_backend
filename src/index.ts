import express, {Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import userRouter from "./routes/userRoutes";

dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("Connected to db successfully")).catch((err) => console.error("Db connection failed: ", err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
    res.send({message: "Working"})
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRouter);


const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
