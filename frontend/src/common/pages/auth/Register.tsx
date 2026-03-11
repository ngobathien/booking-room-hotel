import React from "react";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../services/authService";
import { BeatLoader } from "react-spinners";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  //
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 1. Bắt đầu loading

    // Xử lý đăng ký tài khoản ở đây
    try {
      const userData = { fullName, email, password };
      const response = await register(userData);

      console.log("Registration successful:", response);
      setMessage("Đăng ký thành công! Vui lòng đăng nhập.");

      toast.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.",
      );
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Đăng ký thất bại. Vui lòng thử lại.");

      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    }
    setLoading(false); // 2. Kết thúc loading
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Đăng ký tài khoản
          </h2>

          {/* form đăng ký */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* full_name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Họ và Tên
              </label>
              {/*  */}
              <input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading} // Vô hiệu hóa khi đang loading
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Họ và Tên"
              />
            </div>

            {/* email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              {/*  */}
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading} // Vô hiệu hóa khi đang loading
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              {/*  */}
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading} // Vô hiệu hóa khi đang loading
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* nút đăng ký */}
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
              {loading ? <BeatLoader size={8} color="#ffffff" /> : "Đăng ký"}
            </button>
          </form>

          {/*  */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Đã có tài khoản? {/* chuyển hướng sang login */}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />;
    </>
  );
};

export default Register;
