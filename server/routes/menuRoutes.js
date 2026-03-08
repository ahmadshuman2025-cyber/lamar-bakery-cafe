const express = require("express");
const router = express.Router();
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  seedMenuItems,
} = require("../controllers/menuController");

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get("/", getMenuItems);

// @route   POST /api/menu/seed
// @desc    Seed menu items (for development)
// @access  Public
router.post("/seed", seedMenuItems);

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
router.get("/:id", getMenuItem);

// @route   POST /api/menu
// @desc    Create menu item
// @access  Private
router.post("/", createMenuItem);

// @route   PUT /api/menu/:id
// @desc    Update menu item
// @access  Private
router.put("/:id", updateMenuItem);

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
// @access  Private
router.delete("/:id", deleteMenuItem);

module.exports = router;
