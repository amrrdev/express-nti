import express from "express";
import {
  registerUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
  login,
} from "../controllers/users.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", login);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUserById);
router.delete("/users/:id", auth, deleteUserById);
router.get("/users", getUsers);
export default router;
