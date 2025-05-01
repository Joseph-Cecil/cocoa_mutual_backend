import express, {Request, Response} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => console.log("Connected to db successfully")).catch((err) => console.error("Db connection failed: ", err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/test", (req: Request, res: Response) => {
    res.send({message: "Working"})
})

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
