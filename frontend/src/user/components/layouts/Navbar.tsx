import { useState } from "react";
import { Link, useNavigate } from "react-router";
import LoadingSkeleton from "../../../common/LoadingSkeleton";
import { useAuth } from "../../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn, user, logout, loading } = useAuth();

  if (loading) {
    return <LoadingSkeleton />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-solid border-[#e7ebf3] bg-white/80 backdrop-blur-md">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          {/*  ============================= Logo ===============================*/}
          <Link to="/">{/* Trang chủ */}</Link>
          {/* Nếu là ADMIN thì hiện Dashboard */}
          {user?.role === "ADMIN" && (
            <Link
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
              to="/dashboard"
            >
              Dashboard
            </Link>
          )}
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* ======================== Khi ĐÃ ĐĂNG NHẬP  ======================== */}
            {/*nếu người dùng đã đăng nhập: true thì hiển thị như sau:*/}
            {isLoggedIn && (
              <>
                {/* link đến trang chủ */}
                <Link
                  className="text-sm font-semibold hover:text-primary transition-colors"
                  to="/"
                >
                  Trang chủ
                </Link>

                {/* link đến trang danh sách phòng */}
                <Link
                  className="text-sm font-semibold hover:text-primary transition-colors"
                  to="/rooms"
                >
                  Danh sách phòng
                </Link>

                {/* link đến cá nhân */}
                <Link
                  className="text-sm font-semibold hover:text-primary transition-colors"
                  to="/profile"
                >
                  Trang cá nhân
                </Link>
                {/* link đến trang đặt phòng của tôi */}
                <Link
                  className="text-sm font-semibold hover:text-primary transition-colors"
                  to="/my-bookings"
                >
                  Đặt phòng của tôi
                </Link>

                {/* Chỉ hiện lời chào khi đã đăng nhập thành công */}
                <span className="ml-4 font-bold">
                  Xin chào {user?.role} {user?.fullName}
                </span>

                {/* nút đăng xuất */}
                <div className="flex items-center gap-3 ">
                  <button
                    className="cursor-pointer flex h-10 px-5 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold bg-blue-700 transition-shadow shadow-lg shadow-primary/20"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </button>
                </div>
              </>
            )}

            {/* ========================   Khi CHƯA ĐĂNG NHẬP  ======================== */}
            {!isLoggedIn && (
              <>
                {/* Actions */}
                <div className="flex items-center gap-4">
                  <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold hover:bg-gray-200 transition-colors">
                    {/* Đăng nhập */}
                    <Link to="/login">Đăng nhập</Link>
                  </button>
                  <button className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold hover:bg-gray-200 transition-colors">
                    <Link to="/register">Đăng ký</Link>
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
