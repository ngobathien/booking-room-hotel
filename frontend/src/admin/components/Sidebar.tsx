import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../../common/components/ConfirmModal";
import { useAuth } from "../../hooks/auth/useAuth";
import { useHotel } from "../../hooks/hotel/useHotel";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { hotel, loading } = useHotel();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navItems = [
    { label: "Tổng quan", path: "/dashboard", icon: "dashboard" },
    { label: "Phòng", path: "/dashboard/rooms", icon: "meeting_room" },
    { label: "Loại phòng", path: "/dashboard/room-types", icon: "sell" },
    { label: "Booking", path: "/dashboard/bookings", icon: "calendar_month" },
    { label: "Người dùng", path: "/dashboard/users", icon: "manage_accounts" },
    { label: "Đánh giá", path: "/dashboard/reviews", icon: "star" },
    { label: "Tiện ích", path: "/dashboard/amenities", icon: "tungsten" },
    {
      label: "Giao dịch",
      path: "/dashboard/payments",
      icon: "money",
    },
    { label: "Thông tin khách sạn", path: "/dashboard/hotel", icon: "hotel" },
  ];

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Backdrop mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 bg-white flex flex-col shrink-0 border-r border-slate-200 transition-all duration-300 ease-in-out
        ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-0 lg:border-none"}
        lg:relative lg:translate-x-0
      `}
      >
        {/* Logo Area */}
        <div
          className={`p-6 flex items-center gap-3 overflow-hidden whitespace-nowrap transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
            <span className="material-symbols-outlined text-2xl">
              apartment
            </span>
          </div>

          {/*  */}
          <div className="flex flex-col gap-1 mb-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase">
              Khách sạn
            </p>

            <p className="text-slate-900 text-base font-black leading-tight truncate">
              {hotel?.name || "Loading..."}
            </p>

            <p className="text-primary text-[10px] font-bold  tracking-widest truncate">
              {hotel?.email || hotel?.phone || ""}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav
          className={`flex-1 px-3 mt-4 space-y-1 overflow-y-auto scrollbar-hide transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group whitespace-nowrap ${
                  isActive
                    ? "bg-primary  font-bold shadow-lg shadow-primary/20"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span
                  className={`material-symbols-outlined transition-transform group-hover:scale-110 ${isActive ? "fill-1" : ""}`}
                >
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div
          className={`p-4 border-t border-slate-100 space-y-3 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm shrink-0"
                style={{
                  backgroundImage: `url(${user?.avatar || "https://i.pravatar.cc/150"})`,
                }}
              ></div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-slate-900 truncate">
                  {user?.fullName || "Loading..."}
                </p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">
                  {user?.role || "User"}
                </p>
              </div>
            </div>
            <div className="flex gap-1 mt-1">
              <Link
                to="/dashboard/profile"
                className="flex-1 flex items-center justify-center py-2 bg-white rounded-lg border border-slate-200 text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                HỒ SƠ
              </Link>
              <button
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center py-2 bg-red-50 rounded-lg border border-red-100 text-[10px] font-black text-red-500 hover:bg-red-100 transition-all"
              >
                THOÁT
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Logout Confirm Modal */}
      <ConfirmModal
        open={showLogoutConfirm}
        title="Đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
        confirmText="Đăng xuất"
        cancelText="Hủy"
        isDangerous={false}
      />
    </>
  );
};

export default Sidebar;
