const MenuItem = require("../models/MenuItem");
const connectDB = require("../config/db");
const mongoose = require("mongoose");

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res) => {
  try {
    await connectDB();

    const { category } = req.query;
    let query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    query.isAvailable = true;

    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    console.error("Get menu items error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItem = async (req, res) => {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error("Get menu item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Create menu item (for admin)
// @route   POST /api/menu
// @access  Private
exports.createMenuItem = async (req, res) => {
  try {
    await connectDB();

    const { name, description, price, category, image, isAvailable } = req.body;

    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      category,
      image,
      isAvailable: isAvailable ?? true,
    });

    res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error("Create menu item error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0].message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Update menu item (for admin)
// @route   PUT /api/menu/:id
// @access  Private
exports.updateMenuItem = async (req, res) => {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const { name, description, price, category, image, isAvailable } = req.body;

    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    menuItem.name = name ?? menuItem.name;
    menuItem.description = description ?? menuItem.description;
    menuItem.price = price ?? menuItem.price;
    menuItem.category = category ?? menuItem.category;
    menuItem.image = image ?? menuItem.image;
    menuItem.isAvailable = isAvailable ?? menuItem.isAvailable;

    await menuItem.save();

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    console.error("Update menu item error:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0].message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Delete menu item (for admin)
// @route   DELETE /api/menu/:id
// @access  Private
exports.deleteMenuItem = async (req, res) => {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid menu item ID",
      });
    }

    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    console.error("Delete menu item error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// @desc    Seed initial menu items
// @route   POST /api/menu/seed
// @access  Public (remove in production)
exports.seedMenuItems = async (req, res) => {
  try {
    await connectDB();

    const menuItems = [
      {
        name: "Croissant",
        description: "Flaky, buttery French pastry baked to golden perfection",
        price: 3.5,
        category: "pastries",
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Chocolate Croissant",
        description: "Classic croissant filled with rich Belgian chocolate",
        price: 4.0,
        category: "pastries",
        image:
          "https://images.unsplash.com/photo-1612203985729-70726954388c?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Almond Biscotti",
        description: "Crispy Italian almond biscuits perfect for dipping",
        price: 3.0,
        category: "pastries",
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Chocolate Cake",
        description: "Rich, moist chocolate layer cake with ganache frosting",
        price: 5.99,
        category: "cakes",
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Cheesecake",
        description: "Creamy New York style cheesecake with graham crust",
        price: 6.5,
        category: "desserts",
        image:
          "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Red Velvet Cupcake",
        description: "Classic red velvet cupcake with cream cheese frosting",
        price: 4.5,
        category: "cakes",
        image:
          "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Sourdough Bread",
        description: "Artisan sourdough with crispy crust and tangy flavor",
        price: 6.99,
        category: "breads",
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Baguette",
        description: "Traditional French baguette with golden crust",
        price: 3.99,
        category: "breads",
        image:
          "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Cappuccino",
        description: "Espresso with steamed milk foam and cinnamon",
        price: 4.5,
        category: "drinks",
        image:
          "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Latte",
        description: "Smooth espresso with creamy steamed milk",
        price: 4.0,
        category: "drinks",
        image:
          "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Americano",
        description: "Rich espresso with hot water for a smooth taste",
        price: 3.5,
        category: "drinks",
        image:
          "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop",
        isAvailable: true,
      },
      {
        name: "Mocha",
        description: "Espresso with chocolate and steamed milk",
        price: 5.0,
        category: "drinks",
        image:
          "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop",
        isAvailable: true,
      },
    ];

    await MenuItem.deleteMany({});
    const createdItems = await MenuItem.insertMany(menuItems);

    res.status(201).json({
      success: true,
      message: "Menu items seeded successfully",
      count: createdItems.length,
      data: createdItems,
    });
  } catch (error) {
    console.error("Seed menu items error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
