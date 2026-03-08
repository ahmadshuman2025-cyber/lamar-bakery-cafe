const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContacts,
} = require("../controllers/contactController");

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post("/", submitContact);

// @route   GET /api/contact
// @desc    Get all contact submissions
// @access  Private (would need auth in production)
router.get("/", getContacts);

module.exports = router;
