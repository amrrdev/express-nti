import express from "express";
import {
  registerUser,
  getUserById,
  getUsers,
  updateUserById,
  deleteUserById,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/users/register", registerUser);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUserById);
router.delete("/users/:id", deleteUserById);
router.get("/users", getUsers);
export default router;
