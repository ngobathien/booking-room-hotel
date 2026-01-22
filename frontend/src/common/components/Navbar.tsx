import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className=" flex justify-between items-center p-4 bg-gray-200">
        <Link to="/">Trang chủ</Link>

        <div className="space-x-4">
          {/*nếu người dùng đã đăng nhập: true*/}
          {isLoggedIn ? (
            // hiển thị nút đăng xuất và trang cá nhân
            <>
              {/* Chỉ hiện lời chào khi đã đăng nhập thành công */}
              <span className="ml-4 font-bold">
                Xin chào {user?.role} {user?.fullName}
              </span>

              {/* link đến trang cá nhân */}
              <Link to="/profile">Trang cá nhân</Link>

              {/* nút đăng xuất */}
              <button
                className="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            // hiển thị nút đăng nhập và đăng ký
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
