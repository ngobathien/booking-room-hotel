import { Routes, Route } from "react-router";
import HomePage from "../../user/pages/HomePage";
import Register from "../auth/Register";
import Login from "../auth/Login";

// import AuthLayout from "../components/layouts/AuthLayout";

// import DashboardPage from "../pages/admin/DashboardPage";
// import ManageUsersPage from "../pages/admin/ManageUsersPage";
// import ManagePostsPage from "../pages/admin/ManagePostsPage";
// import ProfilePage from "../pages/ProfilePage";

const AppRoutes = () => (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
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
