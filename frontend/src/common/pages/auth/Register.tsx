import React from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../services/authService";
import { BeatLoader } from "react-spinners";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp");
      return;
    }

    setLoading(true);

    try {
      const userData = { fullName, email, password };

      const response = await register(userData);

      localStorage.setItem("verifyEmail", email);

      toast.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP.",
      );

      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 3500);

      console.log("Registration successful:", response);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Đăng ký thất bại";

      toast.error(message);
      console.error("Registration failed:", error?.response?.data);
    }

    setLoading(false);
  };

  const isPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Đăng ký tài khoản
          </h2>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* full name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và Tên
              </label>

              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                outline-none transition-all"
                placeholder="Họ và Tên"
              />
            </div>

            {/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>

              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  outline-none transition-all"
                  placeholder={showPassword ? "" : "••••••••"}
                />

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

            {/* confirm password */}
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

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>

              {confirmPassword.length > 0 && !isPasswordMatch && (
                <p className="text-sm text-red-500 mt-1">Mật khẩu không khớp</p>
              )}

              {isPasswordMatch && (
                <p className="text-sm text-green-600 mt-1">Mật khẩu khớp ✔</p>
              )}
            </div>

            {/* button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white font-medium py-2.5 rounded-lg transition-colors
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              }`}
            >
              {loading ? <BeatLoader size={8} color="#ffffff" /> : "Đăng ký"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Register;
