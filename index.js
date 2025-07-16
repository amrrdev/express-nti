import express from "express";
import mongoose from "mongoose";
import todosRouter from "./routes/todos.router.js";
import userRoutes from "./routes/users.router.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());

app.use("/", todosRouter);
app.use("/", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/todos-db")
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log(`MongoDB connection error: ${err}`));

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
