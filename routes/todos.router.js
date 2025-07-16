import express from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controller.js";
import { auth, restrictTo } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.post("/todos", createTodo);
router.patch("/todos/:id", updateTodo);
router.delete("/todos/:id", auth, restrictTo("admin"), deleteTodo);

export default router;
