import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { changePasswordApi, loginApi } from "../../common/services/authService";

import { ROLES } from "../../common/constants/roleConstant";
import { useAuth } from "./useAuth";
import { useUsers } from "../user/useUser";

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, logout } = useAuth();
  const { setCurrentUser } = useUsers();

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      toast.error("Vui lòng nhập email và mật khẩu!");
      return;
    }
    setLoading(true);
    try {
      const res = await loginApi({ email, password });
      console.log(res);

      login(res.accessToken);
      setCurrentUser(res.user);
      console.log("res.user", res.user);

      toast.success("Đăng nhập thành công!");
      navigate(res.user?.role === ROLES.ADMIN ? "/dashboard" : "/", {
        replace: true,
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Email hoặc mật khẩu không đúng",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string,
  ) => {
    if (!oldPassword || !newPassword) {
      toast.error("Vui lòng nhập mật khẩu!");
      return;
    }
    setLoading(true);
    try {
      await changePasswordApi(oldPassword, newPassword);
      toast.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
      logout();
      navigate("/login", { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Đổi mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleChangePassword, loading };
};
