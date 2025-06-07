const express = require("express");
const mongoose = require("mongoose");
const User = require('../models/userModel'); // Correct path to the User model
const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age,
        });
        res.status(201).json(userAdded);

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message }); // Correct status code
    }
});

// Get all users
router.get("/", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll); // Use 200 for successful retrieval

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findById(id);
        res.status(200).json(singleUser); // Use 200 for successful retrieval

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await User.findByIdAndDelete(id);
        res.status(200).json(singleUser); // Use 200 for successful deletion

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

// Update a user by ID (PUT/PATCH)
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedUser); // Use 200 for successful update

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
