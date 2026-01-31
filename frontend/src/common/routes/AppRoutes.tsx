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
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";
import MainLayout from "../../user/components/layouts/MainLayout";
import RoomDetailPage from "../../user/pages/Room/RoomDetailPage";
import RoomList from "../../user/pages/Room/RoomList";
import RoomLayout from "../../user/components/layouts/RoomLayout";
import { RoomProvider } from "../../context/RoomContext";
import AdminLayout from "../../admin/components/layouts/AdminLayout";
import AdminRoomLayout from "../../admin/components/layouts/AdminRoomLayout";
import AddRoomPage from "../../admin/components/rooms/AddRoomPage";
import ManageRoomTypesPage from "../../admin/pages/ManageRoomTypesPage";
import AddRoomTypesPage from "../../admin/components/room-types/AddRoomTypesPage";
import AdminRoomTypesLayout from "../../admin/components/layouts/AdminRoomTypesLayout";

const AppRoutes = () => (
  <Routes>
    {/* user ========================================*/}
    <Route element={<MainLayout />}>
      {/* ===== PUBLIC (CÓ NAVBAR) ===== */}
      {/*  ================ trang chủ ========================*/}
      <Route index element={<HomePage />} />

      {/*  ================ trang danh sách rooms ========================*/}
      <Route path="rooms" element={<RoomLayout />}>
        {/*  ================ trang chi tiết room ========================*/}
        <Route path=":roomId/:slug" element={<RoomDetailPage />} />
      </Route>

      {/* <Route path="/rooms" element={<RoomList />} />

      <Route path="/rooms/:roomId" element={<RoomDetailPage />} /> */}

      {/* ================= USER (LOGIN REQUIRED) ================= */}
      <Route
        element={<ProtectedRoute allowedRoles={[ROLES.USER, ROLES.ADMIN]} />}
      >
        {/* trang cá nhân ========================================*/}
        <Route path="/profile" element={<ProfilePage />} />

        {/* ==================== trang đặt phòng của tôi =============================*/}
        {/* <Route path="/my-bookings" element={<ProfilePage />} /> */}
      </Route>
    </Route>

    {/*  ================== admin ======================*/}
    <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
      <Route path="dashboard" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />

        <Route path="users" element={<ManageUsersPage />} />

        <Route path="rooms" element={<AdminRoomLayout />}>
          <Route index element={<ManageRoomPage />} />
          <Route path="create" element={<AddRoomPage />} />
        </Route>

        <Route path="room-types" element={<AdminRoomTypesLayout />}>
          <Route index element={<ManageRoomTypesPage />} />
          <Route path="create" element={<AddRoomTypesPage />} />
        </Route>
      </Route>

      {/* <Route path="dashboard" element={<DashboardPage />}>
        <Route path="users" element={<ManageUsersPage />} />
        <Route
          path="rooms"
          element={
            <RoomProvider>
              <ManageRoomPage />
            </RoomProvider>
          }
        />
      </Route> */}
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
