import { Routes, Route } from "react-router";
import HomePage from "../../user/pages/HomePage";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ProfilePage from "../pages/ProfilePage";
import DashboardPage from "../../admin/pages/DashboardPage";
import ManageUsersPage from "../../admin/pages/ManageUsersPage";
import ProtectedRoute from "../ProtectedRoute";
import { ROLES } from "../constants/roleConstant";
import ManageRoomPage from "../../admin/pages/ManageRoomPage";
import { UserProvider } from "../../context/UserContext cp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";

const AppRoutes = () => (
  <Routes>
    <Route
      index
      element={
        <ProtectedRoute allowedRoles={[ROLES.USER]}>
          <HomePage />
        </ProtectedRoute>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
          <ProfilePage />
        </ProtectedRoute>
      }
    />
    {/* admin */}
    <Route
      path="dashboard"
      element={
        <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
          <DashboardPage />
        </ProtectedRoute>
      }
    >
      <Route path="users" element={<ManageUsersPage />} />
      <Route path="rooms" element={<ManageRoomPage />} />
    </Route>
    {/* admin */}
    {/* <Route path="/dashboard" element={<DashboardPage />}>
      <Route path="users" element={<ManageUsersPage />} />
      <Route path="posts" element={<ManagePostsPage />} />
      <Route path="class" element={<ManageClassesPage />} />
    </Route> */}
    {/* Các trang đăng nhập & đăng ký có layout riêng */}
    {/* <Route
      path="/login"
      element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      }
    /> */}
    {/* <Route
      path="/register"
      element={
        <AuthLayout>
          <Register />
        </AuthLayout>
      }
    /> */}
  </Routes>
);

export default AppRoutes;
