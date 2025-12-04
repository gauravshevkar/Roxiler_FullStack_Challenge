import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const savedRole = localStorage.getItem("role");

  if (!token || !savedRole) return <Navigate to="/login" />;

  if (role && savedRole !== role) return <Navigate to="/login" />;

  return children;
}
