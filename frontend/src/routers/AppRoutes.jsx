import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import OwnerDashboard from "../pages/OwnerDashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../utils/ProtectedRoute";
import AddUser from "../pages/Add_user";
import AddAdmin from "../pages/add_admin";
import AdminStoreList from "../pages/AdminStoreList";
import AdminUserList from "../pages/AdminUserList";
import AddStoreOwner from "../pages/Add_owner";
import AddStore from "../pages/Add_stores";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add_storesowner"
        element={
          <ProtectedRoute role="admin">
            <AddStoreOwner />
          </ProtectedRoute>
        }
      />
        <Route
        path="/admin/add_users"
        element={
          <ProtectedRoute role="admin">
            <AddUser />
          </ProtectedRoute>
        }
      />
        <Route
        path="/admin/add_admin"
        element={
          <ProtectedRoute role="admin">
            <AddAdmin />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/stores" 
      element={
        <ProtectedRoute role="admin">
          <AdminStoreList />
        </ProtectedRoute>
      } 
    />
      <Route path="/admin/users" 
      element={
        <ProtectedRoute role="admin">
          <AdminUserList />
        </ProtectedRoute>
      }
       />
       <Route
  path="/admin/add_stores"
  element={
    <ProtectedRoute role="admin">
      <AddStore />
    </ProtectedRoute>
  }
/>

      


      {/* User Route */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Owner Route */}
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
