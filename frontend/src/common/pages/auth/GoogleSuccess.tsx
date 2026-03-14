import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../../../hooks/auth/useAuth";
import { getProfile } from "../../services/authService";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const token = searchParams.get("token");

      if (!token) return;

      login(token);

      try {
        await getProfile();
      } catch (error) {
        console.error("Lỗi lấy profile", error);
      }

      navigate("/");
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <BeatLoader size={12} color="#4F46E5" />
      <p className="text-gray-600 font-medium">Đang đăng nhập bằng Google...</p>
    </div>
  );
};

export default GoogleSuccess;
