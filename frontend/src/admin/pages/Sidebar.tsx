import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { isLoggedIn, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-semibold transition
     ${isActive ? "bg-primary-50 text-primary-600" : "text-gray-600 hover:bg-gray-100"}`;

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-lg font-black text-gray-900">Admin Panel</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* Dashboard */}
        <NavLink to="/dashboard" className={navItemClass}>
          <span className="material-symbols-outlined text-lg">dashboard</span>
          Dashboard
        </NavLink>
        {/*  Quản lý người dùng */}
        <NavLink to="/dashboard/users" className={navItemClass}>
          <span className="material-symbols-outlined text-lg">group</span>
          Quản lý người dùng
        </NavLink>

        {/* Quản lý phòng */}
        <NavLink to="/dashboard/rooms" className={navItemClass}>
          <span className="material-symbols-outlined text-lg">bed</span>
          Quản lý phòng
        </NavLink>

        {/* Quản lý loại phòng  */}
        <NavLink to="/dashboard/room-types" className={navItemClass}>
          <span className="material-symbols-outlined text-lg">bed</span>
          Quản lý loại phòng
        </NavLink>
      </nav>

      {/* User info */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="size-9 rounded-full bg-gray-200" />
          <div>
            {/* Chỉ hiện lời chào khi đã đăng nhập thành công */}
            <p className="text-sm font-semibold text-gray-900">
              {user?.role} {user?.fullName}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full h-10 rounded-lg bg-gray-100 text-gray-700 text-sm font-bold hover:bg-gray-200 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
