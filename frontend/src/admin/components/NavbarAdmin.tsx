import React from "react";
import * as ReactRouterDom from "react-router-dom";

const { Link, useLocation } = ReactRouterDom;

interface NavbarProps {
  isSidebarOpen: boolean;
  onMenuToggle: () => void;
}

const NavbarAdmin: React.FC<NavbarProps> = ({
  isSidebarOpen,
  onMenuToggle,
}) => {
  const location = useLocation();

  // Danh sách tiêu đề trang dựa trên route
  const pageTitles: Record<string, string> = {
    "/dashboard": "Tổng quan",
    "/dashboard/rooms": "Phòng",
    "/dashboard/room-types": "Loại phòng",
    "/dashboard/bookings": "Booking",
    "/dashboard/payments": "Giao dịch",
    "/dashboard/users": "Người dùng",
    "/dashboard/reviews": "Đánh giá",
    "/dashboard/profile": "Hồ sơ cá nhân",
    "/dashboard/hotel": "Thông tin khách sạn",
  };

  const currentTitle = pageTitles[location.pathname] || "Chi tiết";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile/Desktop Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-primary transition-all shadow-sm border border-slate-200  flex items-center justify-center bg-white "
        >
          <span className="material-symbols-outlined text-2xl">
            {isSidebarOpen ? "menu_open" : "menu"}
          </span>
        </button>

        {/* Dynamic Title & Breadcrumbs */}
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white capitalize truncate max-w-[150px] sm:max-w-none tracking-tight">
            {currentTitle}
          </h2>
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <span>Hệ thống</span>
            <span className="material-symbols-outlined text-[10px]">
              chevron_right
            </span>
            <span className="text-primary">{currentTitle}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search Bar - Hidden on Mobile */}
        <div className="hidden md:relative md:block w-64 lg:w-80 group">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            placeholder="Tìm nhanh mọi thứ..."
            className="block w-full pl-11 pr-4 py-2.5 bg-slate-100  border-2 border-transparent focus:border-primary/20 focus:bg-white  rounded-2xl focus:ring-0 text-sm font-medium transition-all"
          />
        </div>

        {/* Actions Area */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Notifications */}
          <button className="p-2.5 rounded-xl bg-slate-100  text-slate-600 dark:text-slate-400 relative hover:text-primary transition-all border border-transparent group">
            <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
              notifications
            </span>
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
          </button>

          <div className="h-8 w-px bg-slate-200  mx-1 hidden sm:block"></div>

          {/* User Profile Quick Access */}
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
          >
            <img
              src="https://i.pravatar.cc/150?u=admin"
              className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
              alt="Admin"
            />
            <span className="hidden sm:block text-xs font-black text-slate-700 dark:text-slate-300">
              Admin
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;
