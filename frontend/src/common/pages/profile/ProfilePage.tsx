import { useState } from "react";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useUserActions } from "../../../hooks/user/useUserActions";
import LoadingSkeleton from "../../LoadingSkeleton";
import PersonalInfo from "../../components/profile/PersonalInfo";
import ProfileSidebar from "../../components/profile/ProfileSidebar";
import SecuritySettings from "../../components/profile/SecuritySettings";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // profile | security | history
  const { handleUpdateUser } = useUserActions();

  if (loading || !user) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <ProfileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userRole={user.role} // trực tiếp enum backend
        />

        {/* Main content theo tab */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <PersonalInfo user={user} onUpdate={handleUpdateUser} />
          )}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "history" && <div>Lịch sử đặt phòng ở đây</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
