import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
const db = require("./config/db");
import helmet from "helmet";
import compression from "compression";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import restaurantRoutes from "./routes/restaurant";
import categoryRoutes from "./routes/category";

const app: Express = express();

app.use(helmet());
app.use(compression());

dotenv.config();
db();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
