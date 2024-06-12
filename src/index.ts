import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
const db = require("./config/db");
import helmet from "helmet";
import compression from "compression";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import restaurantRoutes from "./routes/restaurant";
import cuisineRoutes from "./routes/cuisine";
import cartRoutes from "./routes/cart";
import orderRoutes from "./routes/order";

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
app.use("/api/cuisine", cuisineRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
