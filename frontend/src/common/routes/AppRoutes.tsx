import { Routes, Route } from "react-router";
import HomePage from "../../user/pages/HomePage";
import Register from "../auth/Register";
import Login from "../auth/Login";
import ProfilePage from "../components/ProfilePage";
import DashboardPage from "../../admin/pages/DashboardPage";
import ManageUsersPage from "../../admin/pages/ManageUsersPage";
import ProtectedRoute from "../ProtectedRoute";

// import AuthLayout from "../components/layouts/AuthLayout";

const AppRoutes = () => (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<ProfilePage />} />

    {/* admin */}
    <Route
      path="dashboard"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <DashboardPage />
        </ProtectedRoute>
      }
    >
      <Route path="users" element={<ManageUsersPage />} />
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
