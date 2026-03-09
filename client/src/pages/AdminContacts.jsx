import { useState, useEffect } from "react";
import api from "../api/axios";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await api.get("/admin/contacts");

      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to load contact messages");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const response = await api.delete(`/admin/contacts/${id}`);

      if (response.data.success) {
        setSuccess("Message deleted successfully");
        const updatedContacts = contacts.filter((c) => c._id !== id);
        setContacts(updatedContacts);

        if (selectedContact?._id === id) {
          setSelectedContact(updatedContacts[0] || null);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#8B4513] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-serif">
          Contact Messages
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          View customer inquiries and messages
        </p>
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Contact List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-semibold text-gray-800">
              All Messages ({contacts.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <div
                  key={contact._id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?._id === contact._id ? "bg-[#F5F0E8]" : ""
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <h3 className="font-medium text-gray-800 break-words">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-400 shrink-0">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 break-all">
                    {contact.email}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2 break-words">
                    {contact.message}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
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

        {/* Contact Details */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden min-h-[300px]">
          {selectedContact ? (
            <>
              <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between gap-3">
                <h2 className="font-semibold text-gray-800">Message Details</h2>
                <button
                  onClick={() => handleDelete(selectedContact._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  title="Delete message"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="text-gray-800 font-medium break-words">
                      {selectedContact.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="text-gray-800 break-all">
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-[#8B4513] hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </p>
                  </div>

                  {selectedContact.phone && (
                    <div>
                      <label className="text-sm text-gray-500">Phone</label>
                      <p className="text-gray-800 break-all">
                        <a
                          href={`tel:${selectedContact.phone}`}
                          className="text-[#8B4513] hover:underline"
                        >
                          {selectedContact.phone}
                        </a>
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm text-gray-500">Received</label>
                    <p className="text-gray-800">
                      {formatDate(selectedContact.createdAt)}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Message</label>
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-800 whitespace-pre-wrap break-words">
                        {selectedContact.message}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: Lamar Bakery Cafe Inquiry`}
                      className="flex-1 py-2 px-4 bg-[#8B4513] text-white text-center rounded-lg hover:bg-[#6B3410] transition-colors"
                    >
                      Reply via Email
                    </a>
                    {selectedContact.phone && (
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="flex-1 py-2 px-4 border border-[#8B4513] text-[#8B4513] text-center rounded-lg hover:bg-[#F5F0E8] transition-colors"
                      >
                        Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-10 sm:p-12 text-center text-gray-500 h-full flex flex-col items-center justify-center">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-base sm:text-lg">
                Select a message to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
