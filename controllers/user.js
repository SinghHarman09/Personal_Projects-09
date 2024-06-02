const express = require("express");
const passport = require("passport");
const router = express.Router();
const { User } = require("../models/model");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already in use" });
    }
    // If the role is admin, check if the request is made by an authenticated admin user
    if (role === "admin") {
      if (!req.isAuthenticated() || req.user.role !== "admin") {
        return res
          .status(403)
          .send({ message: "Only admins can create other admin accounts" });
      }
    }
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log("errorr s ", error);
    res.status(400).send({ message: "Error registering user", error });
  }
};
// Login
const loginUser = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).send(info);
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.status(200).send(user);
        console.log("response", res.logIn);
      });
    })(req, res, next);
  } catch (err) {
    console.log("erorr", err);
    return next(err);
  }
};

// Logout
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send({ message: "Logged out successfully" });
  });
};

// Get user profile
const getUserProfile = (req, res) => {
  res.status(200).send(req.user);
};
// Create User

const Createuser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.log("errror is ", err);
    res.status(400).json({ error: err.message });
  }
};

//Get all users
const GetallUsers = async (req, res) => {
  try {
    const Allusers = await User.find();
    res.status(200).json({ message: "UserList ", Allusers });
  } catch {
    res.status(500).send({ message: "Server Error", error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).json({ message: "User is ", user });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error });
  }
};

const updateUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log("user", user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Server error", error });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id, req.body, {
      new: true,
      runValidators: true,
    });
    console.log("user", user);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Server error", error });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  Createuser,
  GetallUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
