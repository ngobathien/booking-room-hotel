import { Route, Routes } from "react-router";
import AdminBookingLayout from "../../admin/components/layouts/AdminBookingLayout";
import AdminHotelLayout from "../../admin/components/layouts/AdminHotelLayout";
import AdminLayout from "../../admin/components/layouts/AdminLayout";
import AdminPaymentLayout from "../../admin/components/layouts/AdminPaymentLayout";
import AdminReviewsLayout from "../../admin/components/layouts/AdminReviewsLayout";
import AdminRoomLayout from "../../admin/components/layouts/AdminRoomLayout";
import AdminRoomTypesLayout from "../../admin/components/layouts/AdminRoomTypesLayout";
import AddRoomForm from "../../admin/components/rooms/AddRoomForm";
import EditRoomForm from "../../admin/components/rooms/EditRooForm";
import BookingDetailPage from "../../admin/pages/bookings/BookingDetailPage";
import BookingManagement from "../../admin/pages/bookings/BookingManagement";
import DashboardPage from "../../admin/pages/dashboard/DashboardPage";
import ManageHotelPage from "../../admin/pages/hotel/ManageHotelPage";
import ManageRoomPage from "../../admin/pages/room/ManageRoomPage";
import ManageUsersPage from "../../admin/pages/user/ManageUsersPage";
import PaymentManagement from "../../admin/pages/payment/PaymentManagement";
import AdminProfilePage from "../../admin/pages/profile/AdminProfilePage";
import ReviewManagement from "../../admin/pages/reviews/ReviewManagement";
import AddRoomTypePage from "../../admin/pages/room-types/AddRoomTypePage";
import EditRoomTypePage from "../../admin/pages/room-types/EditRoomTypePage";
import ManageRoomTypesPage from "../../admin/pages/room-types/ManageRoomTypesPage";
import MainLayout from "../../user/components/layouts/MainLayout";
import RoomLayout from "../../user/components/layouts/RoomLayout";
import { CheckoutPage } from "../../user/pages/Booking/CheckOutPage";
import MyBookingsPage from "../../user/pages/Booking/MyBookingsPage";

import HomePage from "../../user/pages/Home/HomePage";
import { PaymentBookingPage } from "../../user/pages/Payments/PaymentBookingPage";
import { PaymentResultPage } from "../../user/pages/Payments/PaymentResultPage";
import ProfilePage from "../../user/pages/Profile/ProfilePage";
import RoomDetailPage from "../../user/pages/Room/RoomDetailPage";
import { ROLES } from "../constants/roleConstant";
import ChangePassword from "../pages/auth/ChangePassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import GoogleSuccess from "../pages/auth/GoogleSuccess";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyOtpEmail from "../pages/auth/VerifyOtpEmail";
import ProtectedRoute from "../ProtectedRoute";
import AdminAmenityLayout from "../../admin/components/layouts/AdminAmenityLayout";

import EditAmenityForm from "../../admin/components/amenities/EditAmenityForm";
import { ManageAmenitiesPage } from "../../admin/pages/amenities/ManageAmenitiesPage";
import { AddAmenityForm } from "../../admin/components/amenities/AddAmenityForm";

const AppRoutes = () => (
  <Routes>
    {/* user ========================================*/}
    <Route element={<MainLayout />}>
      {/* ===== PUBLIC (CÓ NAVBAR) ===== */}

      {/*  ================ trang chủ ========================*/}
      <Route index element={<HomePage />} />

      {/*  ================ trang danh sách rooms ========================*/}

      <Route path="rooms" element={<RoomLayout />} />

      <Route path="rooms/:roomId/:slug" element={<RoomDetailPage />} />
      {/* <Route path="/rooms" element={<RoomList />} />

      <Route path="/rooms/:roomId" element={<RoomDetailPage />} /> */}

      {/* checkout */}
      <Route path="checkout/:roomId" element={<CheckoutPage />} />

      {/* Payment Booking Page */}
      <Route
        path="payment/method/:bookingId"
        element={<PaymentBookingPage />}
      />

      <Route path="payment/result" element={<PaymentResultPage />} />
      {/* ================= USER (LOGIN REQUIRED) ================= */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.USER]} />}>
        {/* trang cá nhân ========================================*/}
        <Route path="/profile" element={<ProfilePage />} />

        {/* ==================== trang đặt phòng của tôi =============================*/}
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Route>
    </Route>

    {/*  ================== admin ======================*/}
    <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
      <Route path="dashboard" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        {/* ================= profile =============== */}
        <Route path="profile" element={<AdminProfilePage />} />
        {/* ================= users =============== */}
        <Route path="users" element={<ManageUsersPage />} />
        {/* ================= hotel =============== */}
        <Route path="hotel" element={<AdminHotelLayout />}>
          <Route index element={<ManageHotelPage />} />
          {/* <Route path="edit" element={<EditHotelPage />} />
          <Route path="images" element={<HotelImagesPage />} /> */}
        </Route>
        {/* ================= reviews =============== */}
        <Route path="reviews" element={<AdminReviewsLayout />}>
          <Route index element={<ReviewManagement />} />
        </Route>
        {/* ================= payments =============== */}
        <Route path="payments" element={<AdminPaymentLayout />}>
          <Route index element={<PaymentManagement />} />
        </Route>
        <Route path="rooms" element={<AdminRoomLayout />}>
          <Route index element={<ManageRoomPage />} />
          <Route path="create" element={<AddRoomForm />} />
          <Route path="edit/:id" element={<EditRoomForm />} />
        </Route>
        {/* ================= amenities =============== */}
        <Route path="amenities" element={<AdminAmenityLayout />}>
          <Route index element={<ManageAmenitiesPage />} />
          <Route path="create" element={<AddAmenityForm />} />
          <Route path="edit/:id" element={<EditAmenityForm />} />
        </Route>
        <Route path="room-types" element={<AdminRoomTypesLayout />}>
          <Route index element={<ManageRoomTypesPage />} />
          {/* <Route path="create" element={<AddRoomTypeForm />} />
          <Route path="edit/:id" element={<EditRoomTypeForm />} /> */}
          <Route path="create" element={<AddRoomTypePage />} />
          <Route path="edit/:id" element={<EditRoomTypePage />} />
          EditRoomTypesPage
        </Route>
        {/*  */}
        <Route path="bookings" element={<AdminBookingLayout />}>
          <Route index element={<BookingManagement />} />
          <Route path=":id" element={<BookingDetailPage />} />
        </Route>
        bookings
      </Route>
    </Route>

    {/* auth ========================================*/}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/change-password" element={<ChangePassword />} />
    <Route path="verify-otp" element={<VerifyOtpEmail />} />
    <Route path="/google-success" element={<GoogleSuccess />} />
  </Routes>
);

export default AppRoutes;
