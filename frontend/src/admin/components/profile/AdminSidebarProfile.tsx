import React from "react";
import { LogOut, Camera } from "lucide-react";
import { toast } from "react-toastify";
import { STATUS_USER_STYLE, type User } from "../../../types/user.types";
import { uploadAvatar } from "../../../common/services/userService";

type Props = {
  profileData: User;
  setProfileData: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
};

const AdminSidebarProfile = ({
  profileData,
  setProfileData,
  logout,
}: Props) => {
  const handleUploadAvatar = async (file: File) => {
    try {
      const avatarUrl = await uploadAvatar(profileData._id, file);
      setProfileData({ ...profileData, avatar: avatarUrl });
      toast.success("Cập nhật ảnh đại diện thành công");
    } catch (err) {
      console.error(err);
      toast.error("Upload avatar thất bại");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    handleUploadAvatar(e.target.files[0]);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center space-y-6">
      {/* Avatar + Camera */}
      <div className="relative w-32 h-32 mx-auto group">
        <img
          src={profileData.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-full h-full rounded-full border-4 border-emerald-50 object-cover transition group-hover:scale-105"
        />

        {/* Camera icon */}
        <label
          htmlFor="adminAvatarInput"
          className="absolute bottom-1 right-1 bg-emerald-600 text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4" />
        </label>

        <input
          id="adminAvatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Info */}
      <h2 className="text-xl font-bold text-slate-800">
        {profileData.fullName}
      </h2>
      <p className="text-emerald-600 font-medium text-sm">{profileData.role}</p>

      {/* Status */}
      <div className="pt-6 border-t border-slate-50 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Trạng thái</span>
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold ${
              STATUS_USER_STYLE[profileData.status]
            }`}
          >
            {profileData.status === "ACTIVE" ? "Hoạt động" : profileData.status}
          </span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full mt-6 flex items-center justify-center gap-2 py-2 text-rose-600 font-bold hover:bg-rose-50 rounded-xl transition-all"
      >
        <LogOut className="w-4 h-4" />
        Đăng xuất
      </button>
    </div>
  );
};

export default AdminSidebarProfile;
