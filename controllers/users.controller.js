import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { firstName, username, email, password, birthDate, role = "user" } = req.body;

    if (!firstName || !username || !email || !password || !birthDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const user = await User.create({
      firstName,
      username,
      email,
      password,
      birthDate,
      role,
    });

    user.password = undefined;
    user._id = undefined;
    user.__v = undefined;

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing email or password" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("firstName username email birthDate");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { firstName, username, email, password, birthDate } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    if (birthDate) user.birthDate = birthDate;

    await user.save();

    res.status(200).json({ message: "User was edited successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("firstName username email birthDate");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
