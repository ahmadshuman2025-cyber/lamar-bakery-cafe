const express = require("express");
const router = express.Router();
const {
  login,
  getDashboard,
  seedAdmin,
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllContacts,
  deleteContact,
} = require("../controllers/adminController");
const { protect } = require("../middleware/auth");

// Public routes
router.post("/login", login);
router.post("/seed", seedAdmin);

// Protected routes - require authentication
router.get("/dashboard", protect, getDashboard);
router.get("/menu", protect, getAllMenuItems);
router.post("/menu", protect, createMenuItem);
router.put("/menu/:id", protect, updateMenuItem);
router.delete("/menu/:id", protect, deleteMenuItem);
router.get("/contacts", protect, getAllContacts);
router.delete("/contacts/:id", protect, deleteContact);

module.exports = router;
