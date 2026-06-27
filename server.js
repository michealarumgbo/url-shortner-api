import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import appRouter from "./routes/AppRoutes.js";
import { errorMiddleware } from "./middleware/ErrorMiddleware.js";

dotenv.config();
// initiate express app
const app = express();

// await connection to database
await connectDB();

// allow croos-origin resource sharing
app.use(cors());
// allow json input
app.use(express.json());

// routes
app.use("/url-sh-api/v1", appRouter);

app.use("", errorMiddleware);

// extract port
const PORT = process.env.PORT || 3030;

// start server
app.listen(PORT, (error) => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
