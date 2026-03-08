import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check for token in localStorage
  const token = localStorage.getItem("token");
  const adminStr = localStorage.getItem("admin");

  // Validate token exists
  if (!token || !adminStr) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Try to parse admin data - if invalid, redirect
  try {
    const admin = JSON.parse(adminStr);
    if (!admin || !admin.email) {
      // Invalid admin data - clear and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  } catch (e) {
    // Failed to parse - clear and redirect
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
