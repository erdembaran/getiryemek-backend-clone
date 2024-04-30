import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
const db = require("./config/db");
import helmet from "helmet";
import compression from "compression";
import authRoutes from "./routes/auth";

const app: Express = express();

app.use(helmet());
app.use(compression());

dotenv.config();
db();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
