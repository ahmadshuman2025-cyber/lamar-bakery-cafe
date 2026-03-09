const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const MenuItem = require("../models/MenuItem");
const Contact = require("../models/Contact");
const { generateToken } = require("../middleware/auth");
const Subscriber = require("../models/Subscriber");
const sendEmail = require("../utils/sendEmail");

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    // Get menu stats
    const totalMenuItems = await MenuItem.countDocuments();
    const availableItems = await MenuItem.countDocuments({ isAvailable: true });
    const unavailableItems = await MenuItem.countDocuments({
      isAvailable: false,
    });

    // Get contact stats
    const totalContacts = await Contact.countDocuments();

    // Get recent contacts
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-__v");

    res.json({
      success: true,
      data: {
        menuStats: {
          total: totalMenuItems,
          available: availableItems,
          unavailable: unavailableItems,
        },
        contactStats: {
          total: totalContacts,
        },
        recentContacts,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Seed default admin
// @route   POST /api/admin/seed
// @access  Public (for development only)
const seedAdmin = async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      email: "admin@lamarbakery.com",
    });

    if (existingAdmin) {
      return res.json({
        success: true,
        message: "Admin already exists",
        admin: {
          email: existingAdmin.email,
          name: existingAdmin.name,
        },
      });
    }

    // Create default admin
    const admin = await Admin.create({
      email: "admin@lamarbakery.com",
      password: "Admin123!",
      name: "Lamar Admin",
    });

    res.status(201).json({
      success: true,
      message: "Default admin created successfully",
      admin: {
        email: admin.email,
        name: admin.name,
      },
      credentials: {
        email: "admin@lamarbakery.com",
        password: "Admin123!",
      },
    });
  } catch (error) {
    console.error("Seed admin error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get all menu items (admin)
// @route   GET /api/admin/menu
// @access  Private
const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    console.error("Get menu items error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Create menu item
// @route   POST /api/admin/menu
// @access  Private
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category, image, isAvailable } = req.body;

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      image,
      isAvailable: isAvailable !== false,
    });

    // -------- SEND EMAIL NOTIFICATION --------
    const subscribers = await Subscriber.find({}, "email");

    const emailList = subscribers.map((sub) => sub.email);

    if (emailList.length > 0) {
      await sendEmail({
        to: emailList,
        subject: `New item at Lamar Bakery Cafe: ${menuItem.name}`,
        html: `
          <h2>New Menu Item Added 🍰</h2>
          <p><strong>${menuItem.name}</strong></p>
          <p>${menuItem.description}</p>
          <p>Price: $${menuItem.price}</p>
          <p>Visit Lamar Bakery Cafe to try it!</p>
        `,
      });
    }
    // -----------------------------------------

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menuItem,
    });
  } catch (error) {
    console.error("Create menu item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// @desc    Update menu item
// @route   PUT /api/admin/menu/:id
// @access  Private
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image, isAvailable } = req.body;

    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    menuItem.name = name || menuItem.name;
    menuItem.description = description || menuItem.description;
    menuItem.price = price || menuItem.price;
    menuItem.category = category || menuItem.category;
    menuItem.image = image || menuItem.image;
    menuItem.isAvailable =
      isAvailable !== undefined ? isAvailable : menuItem.isAvailable;

    await menuItem.save();

    res.json({
      success: true,
      message: "Menu item updated successfully",
      data: menuItem,
    });
  } catch (error) {
    console.error("Update menu item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Delete menu item
// @route   DELETE /api/admin/menu/:id
// @access  Private
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    await MenuItem.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    console.error("Delete menu item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get all contacts
// @route   GET /api/admin/contacts
// @access  Private
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Delete contact
// @route   DELETE /api/admin/contacts/:id
// @access  Private
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await Contact.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  login,
  getDashboard,
  seedAdmin,
  getAllMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getAllContacts,
  deleteContact,
};
