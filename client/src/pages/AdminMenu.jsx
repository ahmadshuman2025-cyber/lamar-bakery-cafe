import { useState, useEffect } from "react";
import api from "../api/axios";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "pastries",
    image: "",
    isAvailable: true,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await api.get("/admin/menu");

      if (response.data.success) {
        setMenuItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      setError("Failed to load menu items");
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");

      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = height * (MAX_WIDTH / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = width * (MAX_HEIGHT / height);
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedImage = canvas.toDataURL("image/jpeg", 0.7);

      setFormData((prev) => ({
        ...prev,
        image: compressedImage,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      if (editingItem) {
        const response = await api.put(
          `/admin/menu/${editingItem._id}`,
          payload,
        );

        if (response.data.success) {
          setSuccess("Menu item updated successfully");
          setMenuItems(
            menuItems.map((item) =>
              item._id === editingItem._id ? response.data.data : item,
            ),
          );
        }
      } else {
        const response = await api.post("/admin/menu", payload);

        if (response.data.success) {
          setSuccess("Menu item created successfully");
          setMenuItems([response.data.data, ...menuItems]);
        }
      }

      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "pastries",
      image: item.image || "",
      isAvailable: item.isAvailable ?? true,
    });
    setShowModal(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await api.delete(`/admin/menu/${id}`);

      if (response.data.success) {
        setSuccess("Menu item deleted successfully");
        setMenuItems(menuItems.filter((item) => item._id !== id));
      }
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const toggleAvailability = async (item) => {
    try {
      const response = await api.put(`/admin/menu/${item._id}`, {
        isAvailable: !item.isAvailable,
      });

      if (response.data.success) {
        setMenuItems(
          menuItems.map((i) => (i._id === item._id ? response.data.data : i)),
        );
        setSuccess(
          `Item is now ${!item.isAvailable ? "available" : "unavailable"}`,
        );
      }
    } catch (err) {
      setError("Failed to update availability");
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || "",
        description: item.description || "",
        price: item.price || "",
        category: item.category || "pastries",
        image: item.image || "",
        isAvailable: item.isAvailable ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "pastries",
        image: "",
        isAvailable: true,
      });
    }

    setShowModal(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "pastries",
      image: "",
      isAvailable: true,
    });
    setError("");
    setSuccess("");
  };

  const categories = ["pastries", "cakes", "breads", "drinks", "desserts"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8B4513] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif">
            Menu Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage your bakery menu items
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="w-full sm:w-auto justify-center bg-gradient-to-r from-[#8B4513] to-[#6B3410] text-white px-5 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Item
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg">
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/400x300?text=No+Image"
                }
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 mb-2">
                <h3 className="font-semibold text-base sm:text-lg text-gray-800 break-words">
                  {item.name}
                </h3>

                <span
                  className={`w-fit px-2 py-1 text-xs rounded-full shrink-0 ${
                    item.isAvailable
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>

              <p className="text-gray-500 text-sm mb-3 line-clamp-2 break-words">
                {item.description}
              </p>

              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-lg sm:text-xl font-bold text-[#8B4513]">
                  ${item.price}
                </span>
                <span className="text-sm text-gray-400 capitalize text-right">
                  {item.category}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={() => toggleAvailability(item)}
                  className={`w-full sm:flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    item.isAvailable
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {item.isAvailable ? "Mark Unavailable" : "Mark Available"}
                </button>

                <div className="flex gap-2 sm:shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 sm:flex-none p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    aria-label="Edit item"
                  >
                    <svg
                      className="w-5 h-5 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 sm:flex-none p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    aria-label="Delete item"
                  >
                    <svg
                      className="w-5 h-5 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {menuItems.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-gray-500 text-lg">No menu items yet</p>
          <button
            onClick={() => openModal()}
            className="mt-4 text-[#8B4513] hover:underline font-medium"
          >
            Add your first item
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </h2>

              <button
                type="button"
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="e.g., Chocolate Croissant"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  placeholder="Describe the item..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat} className="capitalize">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-sm px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B4513] focus:border-transparent file:mr-3 file:py-2 file:px-3 file:border-0 file:rounded-md file:bg-[#F5F0E8] file:text-[#8B4513] file:font-medium"
                />

                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#8B4513] border-gray-300 rounded focus:ring-[#8B4513]"
                />
                <label htmlFor="isAvailable" className="text-sm text-gray-700">
                  Available for order
                </label>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#8B4513] text-white rounded-lg hover:bg-[#6B3410] transition-colors"
                >
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
