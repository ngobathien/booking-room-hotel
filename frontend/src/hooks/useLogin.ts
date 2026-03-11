import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { loginApi } from "../common/services/authService";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../common/constants/roleConstant";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu!");
      return;
    }

    setLoading(true);
    try {
      // gọi loginApi
      const res = await loginApi({ email, password });
      console.log("info user : ", res);
      console.log("role: ", res.user?.role);

      login(res.access_token);

      toast.success("Đăng nhập thành công!");

      //   setTimeout(() => {
      //     if (res.user.role === ROLES.ADMIN) {
      //       navigate("/dashboard", { replace: true });
      //     } else {
      //       navigate("/", { replace: true });
      //     }
      //   }, 500);

      navigate(res.user?.role === ROLES.ADMIN ? "/dashboard" : "/", {
        replace: true,
      });
    } catch (error: any) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Lỗi do server mất kết nối");
      } else {
        const message =
          error?.response?.data?.message ||
          "Email đã tồn tại hoặc mật khẩu không đúng";

        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
};
