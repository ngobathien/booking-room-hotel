import React from "react";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  return (
    <>
      <h1>Trang cá nhân</h1>
      {user ? (
        <div>
          <p>Họ và tên: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>Vai trò: {user.role}</p>
        </div>
      ) : (
        <p>Không có thông tin người dùng.</p>
      )}
    </>
  );
};

export default ProfilePage;
