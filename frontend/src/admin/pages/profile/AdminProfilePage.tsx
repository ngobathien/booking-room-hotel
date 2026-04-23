import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/auth/useAuth";
import { type User } from "../../../types/user.types";
import AdminSidebarProfile from "../../components/profile/AdminSidebarProfile";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";
import ProfileInfoForm from "../../components/profile/ProfileInfoForm";

const AdminProfilePage = () => {
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) setProfileData(user);
    setLoading(false);
  }, [user]);

  if (loading)
    return <div className="text-center py-20">Đang tải thông tin...</div>;
  if (!profileData)
    return (
      <div className="text-center py-20 text-red-500">
        Không có dữ liệu user!
      </div>
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Tài khoản cá nhân</h1>
        <p className="text-slate-500">
          Quản lý thông tin cá nhân và bảo mật tài khoản của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột trái: Sidebar Profile */}
        <AdminSidebarProfile
          profileData={profileData}
          setProfileData={
            setProfileData as React.Dispatch<React.SetStateAction<User>>
          }
          logout={logout}
        />

        {/* Cột phải: Form */}
        <div className="lg:col-span-2 space-y-8">
          <ProfileInfoForm
            profileData={profileData}
            setProfileData={
              setProfileData as React.Dispatch<React.SetStateAction<User>>
            }
          />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
