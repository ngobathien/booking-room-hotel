import { Headset, History, LogOut, Shield, User } from "lucide-react";
import React from "react";
import { cn } from "../../../lib/utils";

type UserRole = "ADMIN" | "USER";

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: UserRole;
}

const roleLabelMap: Record<UserRole, string> = {
  ADMIN: "Quản trị viên",
  USER: "Thành viên Silver",
};

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  setActiveTab,
  userRole = "USER",
}) => {
  const isAdmin = userRole === "ADMIN";

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

          <button
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
          </button>

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

          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all text-left">
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-bold">Đăng xuất</span>
          </button>
        </nav>

        <button className="w-full flex items-center justify-center gap-2 rounded-xl h-12 bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all">
          <Headset className="h-5 w-5" />
          <span>Hỗ trợ khách hàng</span>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
