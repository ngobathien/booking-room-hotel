import React from "react";
import { forgotPasswordApi } from "../../services/authService";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 1. Bắt đầu loading

    // Xử lý đăng ký tài khoản ở đây
    try {
      const response = await forgotPasswordApi(email);

      console.log("forgotPasswordApi successful:", response);

      toast.success(
        "Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu.",
      );
    } catch (error) {
      console.error("Registration failed:", error);

      toast.error("Gửi thất bại. Vui lòng thử lại.");
    }
    setLoading(false); // 2. Kết thúc loading
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-2">
          Quên mật khẩu
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Nhập email của bạn để nhận link đặt lại mật khẩu
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

export default ForgotPassword;
