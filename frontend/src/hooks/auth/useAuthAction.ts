import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { loginApi } from "../../common/services/authService";

import { ROLES } from "../../common/constants/roleConstant";
import { useAuth } from "./useAuth";

export const useAuthAction = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // login
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

      login(res.accessToken);

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
