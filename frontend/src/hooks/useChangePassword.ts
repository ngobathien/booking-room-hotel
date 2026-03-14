import { toast } from "react-toastify";
import { changePasswordApi } from "../common/services/authService";
import { useState } from "react";

import { useNavigate } from "react-router";
import { useAuth } from "./auth/useAuth";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { logout } = useAuth();
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

  return { handleChangePassword, loading };
};
