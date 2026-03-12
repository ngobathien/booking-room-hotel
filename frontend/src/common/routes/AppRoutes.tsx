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
import RoomLayout from "../../user/components/layouts/RoomLayout";
import AdminLayout from "../../admin/components/layouts/AdminLayout";
import AdminRoomLayout from "../../admin/components/layouts/AdminRoomLayout";
import ManageRoomTypesPage from "../../admin/pages/room-types/ManageRoomTypesPage";
import AdminRoomTypesLayout from "../../admin/components/layouts/AdminRoomTypesLayout";
import AddRoomTypeForm from "../../admin/components/room-types/AddRoomTypeForm";
import AddRoomForm from "../../admin/components/rooms/AddRoomForm";
import EditRoomForm from "../../admin/components/rooms/EditRooForm";
import EditRoomTypeForm from "../../admin/components/room-types/EditRoomTypeForm";
import AddRoomTypePage from "../../admin/pages/room-types/AddRoomTypePage";
import EditRoomTypePage from "../../admin/pages/room-types/EditRoomTypePage";
import VerifyOtpEmail from "../pages/auth/VerifyOtpEmail";
import { CheckoutPage } from "../../user/pages/Booking/CheckOutPage";

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

      {/* checkout */}
      <Route path="checkout/:roomId" element={<CheckoutPage />} />

      {/* ================= USER (LOGIN REQUIRED) ================= */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
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
          <Route path="create" element={<AddRoomForm />} />
          <Route path="edit/:id" element={<EditRoomForm />} />
        </Route>

        <Route path="room-types" element={<AdminRoomTypesLayout />}>
          <Route index element={<ManageRoomTypesPage />} />
          {/* <Route path="create" element={<AddRoomTypeForm />} />
          <Route path="edit/:id" element={<EditRoomTypeForm />} /> */}
          <Route path="create" element={<AddRoomTypePage />} />
          <Route path="edit/:id" element={<EditRoomTypePage />} />
          EditRoomTypesPage
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
    <Route path="verify-otp" element={<VerifyOtpEmail />} />

    {/*
     <Route path="/dashboard" element={<DashboardPage />}>
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
