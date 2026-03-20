import React, { useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import LoadingSkeleton from "../LoadingSkeleton";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import PersonalInfo from "../components/profile/PersonalInfo";
import SecuritySettings from "../components/profile/SecuritySettings";
import { useUserActions } from "../../hooks/user/useUserActions";

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
          userRole={user.role.toLowerCase()}
        />

        {/* Main content theo tab */}
        <div className="flex-1 space-y-6">
          {activeTab === "profile" && (
            <PersonalInfo user={user} onUpdate={handleUpdateUser} />
          )}
          {activeTab === "security" && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
