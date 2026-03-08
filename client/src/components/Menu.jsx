import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Menu = ({ showToast }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart, openCart } = useCart();

  // Fallback menu items if API is not available
  const fallbackItems = [
    {
      _id: "1",
      name: "Croissant",
      description: "Flaky, buttery French pastry",
      price: 3.5,
      category: "pastries",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    },
    {
      _id: "2",
      name: "Chocolate Cake",
      description: "Rich chocolate layer cake",
      price: 5.99,
      category: "cakes",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    },
    {
      _id: "3",
      name: "Cappuccino",
      description: "Espresso with steamed milk foam",
      price: 4.5,
      category: "drinks",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
    },
    {
      _id: "4",
      name: "Latte",
      description: "Smooth espresso with creamy milk",
      price: 4.0,
      category: "drinks",
      image:
        "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=300&fit=crop",
    },
    {
      _id: "5",
      name: "Cheesecake",
      description: "Creamy New York style",
      price: 6.5,
      category: "desserts",
      image:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop",
    },
    {
      _id: "6",
      name: "Fresh Bread",
      description: "Artisan sourdough loaf",
      price: 4.99,
      category: "breads",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    },
  ];

  const categories = [
    { id: "all", label: "All" },
    { id: "pastries", label: "Pastries" },
    { id: "breads", label: "Breads" },
    { id: "cakes", label: "Cakes" },
    { id: "desserts", label: "Desserts" },
    { id: "drinks", label: "Drinks" },
  ];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      // Try to fetch from API
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      const response = await axios.get(`${apiUrl}/menu`, {
        timeout: 5000,
      });

      if (response.data.success && response.data.data.length > 0) {
        setMenuItems(response.data.data);
      } else {
        // If API returns empty, use fallback
        setMenuItems(fallbackItems);
      }
    } catch (error) {
      console.log("Using fallback menu items");
      setMenuItems(fallbackItems);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 bg-primary">
      <div className="container-custom">
        <h2 className="section-title">Our Menu</h2>
        <p className="section-subtitle">Discover our delicious offerings</p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-secondary text-white shadow-soft"
                  : "bg-white text-gray-700 hover:bg-accent hover:text-white"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item._id}
                className="card group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-secondary capitalize">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-xl font-semibold text-gray-800 mb-2 group-hover:text-accent transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-accent">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => {
                        addToCart(item);
                        if (showToast) {
                          showToast(`${item.name} added to cart!`, "success");
                        }
                        openCart();
                      }}
                      className="px-4 py-2 bg-secondary text-white rounded-full text-sm font-medium hover:bg-accent transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <i className="fas fa-utensils text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">
              No items found in this category
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
