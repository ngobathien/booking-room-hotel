import { Routes, Route } from "react-router";
import HomePage from "../../user/pages/Home/HomePage";
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
import MainLayout from "../../user/components/layouts/MainLayout";

const AppRoutes = () => (
  <Routes>
    {/* user ========================================*/}
    <Route element={<MainLayout />}>
      {/* ===== PUBLIC (CÓ NAVBAR) ===== */}
      {/*  ================ trang chủ ========================*/}
      <Route index element={<HomePage />} />

      {/* ================= USER (LOGIN REQUIRED) ================= */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
        {/* trang cá nhân ========================================*/}
        <Route path="/profile" element={<ProfilePage />} />

        {/* ==================== trang đặt phòng của tôi =============================*/}
        <Route path="/my-bookings" element={<ProfilePage />} />
      </Route>
    </Route>

    {/*  ================== admin ======================*/}
    <Route path="" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="users" element={<ManageUsersPage />} />
      <Route path="rooms" element={<ManageRoomPage />} />
    </Route>

    {/* auth ========================================*/}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/change-password" element={<ChangePassword />} />

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
