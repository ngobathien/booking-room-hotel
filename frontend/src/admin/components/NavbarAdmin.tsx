import React, { useEffect, useState, useRef } from "react";
import * as ReactRouterDom from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { io } from "socket.io-client";
import notificationService from "../../common/services/notification.service";

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
  const { user } = useAuth();

  const [notifCount, setNotifCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [openNotif, setOpenNotif] = useState(false);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const rawBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
    // Use the origin (scheme + host) and force socket path to root '/socket.io'
    // because NestJS Socket.IO attaches at the server root by default.
    let origin: string;
    try {
      const u = new URL(rawBase);
      origin = u.origin;
    } catch (e) {
      origin = rawBase; // fallback
    }

    const socket = io(`${origin}/notifications`, {
      path: "/socket.io",
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("notifications socket connected", socket.id);
    });

    socket.on("newBooking", (payload: any) => {
      const note = {
        id: payload.bookingId || payload.bookingCode || Date.now().toString(),
        title: "Đơn đặt phòng mới",
        body: `Mã: ${payload.bookingCode || payload.bookingId || "-"}`,
        data: payload,
        createdAt: new Date(),
        read: false,
      };
      setNotifications((prev) => [note, ...prev]);
      setNotifCount((c) => c + 1);
    });

    socket.on("disconnect", () => {
      console.log("notifications socket disconnected");
    });

    // fetch persisted notifications if backend supports it
    (async () => {
      try {
        const list = await notificationService.getNotifications({ limit: 50 });
        const normalized = (list || []).map((n: any) => ({
          ...n,
          createdAt: n.createdAt || new Date().toISOString(),
        }));
        setNotifications(normalized as any[]);
        const unread = normalized.filter((n: any) => !n.read).length;
        setNotifCount(unread);
      } catch (e) {
        console.debug("fetch notifications failed", e);
      }
    })();

    return () => {
      try {
        socket.disconnect();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  function toggleNotif() {
    setOpenNotif((v) => {
      const next = !v;
      if (next) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        setNotifCount(0);
        // persist read state to backend if available
        notificationService.markAllRead().catch(() => {
          /* ignore errors */
        });
      }
      return next;
    });
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 hover:text-primary transition-all shadow-sm border border-slate-200  flex items-center justify-center bg-white "
        >
          <span className="material-symbols-outlined text-2xl">
            {isSidebarOpen ? "menu_open" : "menu"}
          </span>
        </button>

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
        {/* <div className="hidden md:relative md:block w-64 lg:w-80 group">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            search
          </span>
          <input
            type="text"
            placeholder="Tìm nhanh mọi thứ..."
            className="block w-full pl-11 pr-4 py-2.5 bg-slate-100  border-2 border-transparent focus:border-primary/20 focus:bg-white  rounded-2xl focus:ring-0 text-sm font-medium transition-all"
          />
        </div> */}

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative">
            <button
              onClick={toggleNotif}
              className="p-2.5 rounded-xl bg-slate-100  text-slate-600 dark:text-slate-400 relative hover:text-primary transition-all border border-transparent group"
            >
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
                notifications
              </span>
              {notifCount > 0 ? (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-4 leading-4 text-[10px] text-white bg-red-500 rounded-full flex items-center justify-center px-1 border-2 border-white dark:border-slate-900 shadow-sm">
                  {notifCount}
                </span>
              ) : (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"></span>
              )}
            </button>

            {openNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-100 shadow-lg rounded-lg z-50">
                <div className="p-3 border-b border-slate-100 font-bold flex items-center justify-between">
                  <span>Thông báo</span>
                  {notifCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-[12px] px-2 py-0.5 rounded-full">
                      {notifCount} mới
                    </span>
                  )}
                </div>
                <div className="max-h-64 overflow-auto">
                  {notifications.length === 0 ? (
                    <div className="p-3 text-sm text-slate-500">
                      Không có thông báo
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 border-b border-slate-50 ${n.read ? "bg-white" : "bg-slate-50"}`}
                      >
                        <div className="text-sm font-bold">{n.title}</div>
                        <div className="text-xs text-slate-600 mt-1">
                          {n.body}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-2">
                          {new Date(n.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-8 w-px bg-slate-200  mx-1 hidden sm:block"></div>

          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
          >
            <img
              src={user?.avatar || "https://i.pravatar.cc/150"}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
              alt="User"
            />
            <span className="hidden sm:block text-xs font-black text-slate-700">
              {user?.fullName || "Loading..."}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavbarAdmin;
