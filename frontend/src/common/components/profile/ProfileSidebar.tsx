import React from "react";
import { User, History, LogOut, Shield, Star, Headset } from "lucide-react";
import { cn } from "../../../lib/utils";

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole?: "admin" | "user";
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeTab,
  setActiveTab,
  userRole = "user",
}) => {
  const isAdmin = userRole === "admin";

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-8">
        {/* Avatar + info */}
        <div className="flex items-center gap-4">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-14 h-14 border-2 border-primary"
            style={{
              backgroundImage: `url(${
                isAdmin
                  ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
              })`,
            }}
          ></div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold">
              {isAdmin ? "Admin Manager" : "Nguyễn Văn A"}
            </h3>
            <p className="text-primary text-[10px] font-bold mt-1.5 flex items-center gap-1 uppercase tracking-wider">
              <Star className="h-3 w-3 fill-current" />{" "}
              {isAdmin ? "Quản trị viên" : "Thành viên Silver"}
            </p>
          </div>
        </div>

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
