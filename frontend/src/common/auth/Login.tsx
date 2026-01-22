import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { loginApi } from "../services/authService";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../constants";

const Login = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { isLoggedIn, setIsLoggedIn, user, login } = useAuth();

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (isLoggedIn && user) {
  //     if (user.role === ROLES.ADMIN) {
  //       navigate("/dashboard", { replace: true });
  //     } else {
  //       navigate("/", { replace: true });
  //     }
  //   }
  // }, [isLoggedIn, user, navigate]);

  //=========================== Xử lý sự kiện đăng nhập ===========================
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu!");
      return;
    }

    setLoading(true);

    try {
      // Gọi API đăng nhập
      const loginUser = await loginApi({ email, password });
      console.log("loginUser:", loginUser);

      // login từ AuthContext, dùng để truyền dư liệu user và token lên context
      login(loginUser.user, loginUser.access_token);

      // thông báo đăng nhập thành công
      toast.success("Đăng nhập thành công!");

      // Redirect theo role (delay nhẹ cho toast render)
      setTimeout(() => {
        if (loginUser.user.role === ROLES.ADMIN) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      }, 300);
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error);
      if (error.code === "ERR_NETWORK") {
        toast.error("Lỗi do server mất kết nối");
        return;
      }

      toast.error(
        error?.response?.data?.message || "Email hoặc mật khẩu không đúng",
      );
    } finally {
      setLoading(false);
    }
  };

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

            <form onSubmit={handleLogin} className="space-y-4">
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
                <input
                  id="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Quên mật khẩu?
                </a>
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
