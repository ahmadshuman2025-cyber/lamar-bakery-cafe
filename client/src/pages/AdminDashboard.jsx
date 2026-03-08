import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    menuStats: { total: 0, available: 0, unavailable: 0 },
    contactStats: { total: 0 },
    recentContacts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8B4513] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 font-serif">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Welcome to Lamar Bakery Cafe Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Menu Items */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#8B4513]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Menu Items</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.menuStats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#F5F0E8] rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#8B4513]"
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
            </div>
          </div>
        </div>

        {/* Available Items */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Available Items</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.menuStats.available}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Unavailable Items */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Unavailable Items</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.menuStats.unavailable}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Contacts */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#D2691E]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Contact Messages</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.contactStats.total}
              </p>
            </div>
            <div className="w-12 h-12 bg-[#F5F0E8] rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#D2691E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/admin/menu"
          className="bg-gradient-to-r from-[#8B4513] to-[#6B3410] text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6"
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
            </div>
            <div>
              <h3 className="font-semibold text-lg">Manage Menu</h3>
              <p className="text-amber-100 text-sm">
                Add, edit, or remove menu items
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/contacts"
          className="bg-gradient-to-r from-[#D2691E] to-[#8B4513] text-white rounded-xl p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">View Messages</h3>
              <p className="text-amber-100 text-sm">
                Check customer contact submissions
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Messages
          </h2>
          <Link
            to="/admin/contacts"
            className="text-[#8B4513] hover:underline text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        {stats.recentContacts.length > 0 ? (
          <div className="space-y-4">
            {stats.recentContacts.map((contact) => (
              <div
                key={contact._id}
                className="border-b border-gray-100 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {contact.name}
                    </h4>
                    <p className="text-sm text-gray-500">{contact.email}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {contact.message}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto text-gray-300 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p>No messages yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
