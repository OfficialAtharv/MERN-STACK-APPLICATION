const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../Models/userModel");

const app = express();
const router = express.Router();

// Middleware to parse JSON bodies
app.use(express.json());

// Create API
router.post("/", async (req, res) => {
  const { name, email, age } = req.body;

  try {
    const userAdded = await userModel.create({ name, email, age });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const showall = await userModel.find();
    res.status(200).json(showall);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await userModel.findById(id);
    if (!singleUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user by ID
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
