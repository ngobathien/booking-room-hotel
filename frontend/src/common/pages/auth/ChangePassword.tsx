import React, { useState } from "react";
import { useChangePassword } from "../../../hooks/user/useChangePassword";

import { Link } from "react-router";

const ChangePassword = () => {
  // const [userId, setUserId] = React.useState<string | null>(null);
  const [oldPassword, setOldPassword] = React.useState("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);

  const [newPassword, setNewPassword] = React.useState("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const { handleChangePassword, loading } = useChangePassword();

  const submitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    handleChangePassword(oldPassword, newPassword);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          <form onSubmit={submitChangePassword} className="space-y-4">
            {/* mật khẩu cũ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu hiện tại
              </label>

              <div className="relative">
                <input
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  //   disabled={loading}
                  //   type="password"
                  value={oldPassword}
                  type={showOldPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 outline-none transition-all"
                  placeholder={showOldPassword ? "" : "••••••••"}
                />

                {/* nút con mắt */}
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showOldPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            {/* mật khẩu mới*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu mới
              </label>

              <div className="relative">
                <input
                  id="password"
                  //   type="password"
                  value={newPassword}
                  autoComplete="current-password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  type={showNewPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 outline-none transition-all"
                  placeholder={showNewPassword ? "" : "••••••••"}
                />

                {/* nút con mắt */}
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showNewPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white transition 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? "Đang đổi..." : "Đổi mật khẩu"}
            </button>
          </form>

          <div className="text-center mt-4">
            {/* <a href="/login" className="text-sm text-blue-600 hover:underline">
              Quay lại đăng nhập
            </a> */}
            <Link className="text-sm text-blue-600 hover:underline" to="/">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
