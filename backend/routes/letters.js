const express = require("express");
const { uploadToDrive } = require("../utils/googleDrive");
const User = require("../models/User"); // ✅ Import User model

const router = express.Router();

router.post("/save", async (req, res) => {
    console.log("Session User:", req.user);

    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { title, content } = req.body;

    // ✅ Retrieve user from MongoDB
    const user = await User.findById(req.user._id);
    
    if (!user || !user.accessToken) {
      return res.status(401).json({ error: "No Google access token found. Please log in again." });
    }

    try {
      const fileId = await uploadToDrive(user.accessToken, content, title);
      res.json({ success: true, fileId });
    } catch (error) {
      console.error("Google Drive Error:", error);
      res.status(500).json({ error: "Failed to save letter" });
    }
});

module.exports = router;
