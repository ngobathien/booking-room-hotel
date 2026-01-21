import React from "react";
import { Link } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../services/authService";
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
    <div className="">
      <h2 className="">Đăng ký</h2>
      <form onSubmit={handleRegister}>
        {/* full_name */}
        <input
          id="name"
          type="text"
          placeholder="Họ và Tên"
          // className="w-full px-4 py-2 border rounded mb-3"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={loading} // Vô hiệu hóa khi đang loading
        />
        <br />
        {/* email */}
        <input
          id="email"
          type="email"
          placeholder="Email"
          // className="w-full px-4 py-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading} // Vô hiệu hóa khi đang loading
        />
        <br />
        {/* password */}
        <input
          id="password"
          type="password"
          placeholder="Mật khẩu"
          // className="w-full px-4 py-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading} // Vô hiệu hóa khi đang loading
        />
        <br />
        <button
          id="registerBtn"
          type="submit"
          // className={`w-full text-white py-2 rounded transition duration-150 ${
          //   loading
          //     ? "bg-gray-400 cursor-not-allowed"
          //     : "bg-green-500 hover:bg-green-600"
          // }`}
          disabled={loading} // Vô hiệu hóa nút khi đang loading
        >
          {loading ? (
            // Hiển thị hiệu ứng loading xoay tròn
            <div className="flex items-center justify-center">
              <BeatLoader size={8} color={"#ffffff"} loading={loading} />
            </div>
          ) : (
            // Nội dung nút bình thường
            "Đăng ký"
          )}
        </button>
      </form>

      {message && <p className="text-center mt-3 text-red-500">{message}</p>}

      <p className="text-center mt-3 text-sm">
        Đã có tài khoản? {/* chuyển hướng sang login */}
        <Link to="/login" className="text-blue-500">
          Đăng nhập
        </Link>
      </p>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
