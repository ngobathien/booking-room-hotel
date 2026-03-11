import React, { useState } from "react";
import { resetPasswordApi } from "../../services/authService";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";

const ResetPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  // lấy mã token từ url: ví dụ http://localhost:5173/reset-password?token=abc123
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");
  console.log("Params Reset Token:", resetToken); // token sẽ là abc123
  const isPasswordMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  //
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp");
      return;
    }

    try {
      if (!resetToken) {
        toast.error("Token không hợp lệ. Vui lòng thử lại.");
        return;
      }

      const response = await resetPasswordApi(resetToken, newPassword);

      console.log("resetPasswordApi successful:", response);

      toast.success("Đổi mật khẩu thành công. Đăng nhập lại để sử dụng");
    } catch (error) {
      console.error("Registration failed:", error);

      toast.error("Gửi thất bại. Vui lòng thử lại.");
    }
    setLoading(false); // 2. Kết thúc loading
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <p className="text-sm text-gray-500 text-center mb-6">
          Nhập mật khẩu mới
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          {/* mật khẩu */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>

            <div className="relative">
              <input
                id="password"
                value={newPassword}
                autoComplete="current-password"
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg
                 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                 outline-none transition-all"
                placeholder={showPassword ? "" : "••••••••"}
              />

              {/* nút con mắt */}
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
              <p className="text-sm text-red-500 mt-1">Mật khẩu không khớp</p>
            )}

            {isPasswordMatch && (
              <p className="text-sm text-green-600 mt-1">Mật khẩu khớp ✔</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Đang gửi..." : "Gửi email"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            Quay lại đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
