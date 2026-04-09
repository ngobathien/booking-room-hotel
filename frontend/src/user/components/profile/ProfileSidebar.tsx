import { Headset, History, LogOut, Shield, User } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/utils";
import { useAuth } from "../../../hooks/auth/useAuth";

type UserRole = "ADMIN" | "USER";

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: UserRole;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { logout } = useAuth();
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-8">
        {/* Avatar + info */}

        {/* Menu */}
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
              activeTab === "profile"
                ? "bg-slate-100 text-primary font-bold"
                : "text-slate-600 hover:bg-slate-50",
            )}
          >
            <User className="h-5 w-5" />
            <span className="text-sm">Thông tin cá nhân</span>
          </button>

          {/* <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
              activeTab === "history"
                ? "bg-slate-100 text-primary font-bold"
                : "text-slate-600 hover:bg-slate-50",
            )}
          >
            <History className="h-5 w-5" />
            <span className="text-sm">Lịch sử đặt phòng</span>
          </button> */}

          <button
            onClick={() => setActiveTab("security")}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left",
              activeTab === "security"
                ? "bg-slate-100 text-primary font-bold"
                : "text-slate-600 hover:bg-slate-50",
            )}
          >
            <Shield className="h-5 w-5" />
            <span className="text-sm">Bảo mật</span>
          </button>

          <div className="h-px bg-slate-100 my-2"></div>

          <button
            onClick={logout} // ← thêm đây
            className="cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all text-left"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-bold">Đăng xuất</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
