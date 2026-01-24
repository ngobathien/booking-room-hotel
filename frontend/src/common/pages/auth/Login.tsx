import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";

import { useAuth } from "../../../context/AuthContext";

import { useLogin } from "../../../hooks/useLogin";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = React.useState<string>("");

  const [password, setPassword] = React.useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const { isLoggedIn, setIsLoggedIn, user, login } = useAuth();

  //=========================== Xử lý sự kiện đăng nhập ===========================

  const { handleLogin, loading } = useLogin();

  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp");
      return;
    }

    handleLogin(email, password);
  };

  const isPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  // Giao diện đăng nhập
  return (
    <>
      {!isLoggedIn && (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Đăng nhập
            </h2>
            {/*  form đăng nhập  */}

            <form onSubmit={handleSubmitLogin} className="space-y-4">
              {/* email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>

              {/* mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>

                <div className="relative">
                  <input
                    id="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 outline-none transition-all"
                    // placeholder="••••••••"
                    placeholder={showPassword ? "" : "••••••••"}
                  />

                  {/* nút ẩn hiện */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>

              {/* Nhập lại mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nhập lại mật khẩu
                </label>

                <div className="relative">
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all
      ${
        confirmPassword.length === 0
          ? "border-gray-300"
          : isPasswordMatch
            ? "border-green-500 focus:ring-green-500"
            : "border-red-500 focus:ring-red-500"
      }`}
                    placeholder={showConfirmPassword ? "" : "••••••••"}
                  />
                  {/* nút ẩn hiện */}
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? "Ẩn" : "Hiện"}
                  </button>{" "}
                </div>
                {/* Message */}
                {confirmPassword.length > 0 && !isPasswordMatch && (
                  <p className="text-sm text-red-500 mt-1">
                    Mật khẩu không khớp
                  </p>
                )}

                {isPasswordMatch && (
                  <p className="text-sm text-green-600 mt-1">Mật khẩu khớp ✔</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                {/* <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label> */}

                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {/* nút đăng nhập  */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
              >
                {loading ? (
                  <BeatLoader size={8} color="#ffffff" />
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Đăng ký
              </Link>
            </div>

            {/* chuyển hướng sang đăng ký */}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
