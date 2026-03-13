import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ROLES } from "../common/constants/roleConstant";
import { forgotPasswordApi, getProfile } from "../common/services/authService";

type User = {
  role: string;
  fullName: string;
  email: string;
  phone_number: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  isAdmin: boolean;
  isUser: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // =========================== lấy thông tin user ===========================
  // nhớ đọc lại để hiểu logic này
  // load thông tin user từ localStorage khi component được mount
  const [user, setUsers] = useState<User | null>(null);

  //   //=========================== trạng thái loading ===========================
  const [loading, setLoading] = useState(true);

  //=========================== trạng thái đăng nhập ===========================
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* ======================================================
    useEffect: chạy 1 lần khi app mount
       → dùng để:
       - check token
       - gọi API /auth/profile
  ====================================================== */

  const loadProfile = async () => {
    setLoading(true);

    // Có token → gọi API lấy thông tin user
    try {
      const res = await getProfile();
      // console.log("getProfile: ", res);

      // Lưu user vào state
      setUsers(res);

      // Đánh dấu đã đăng nhập
      setIsLoggedIn(true);
    } catch {
      // Token sai / hết hạn
      localStorage.removeItem("token");
      setUsers(null);
    } finally {
      // Kết thúc loading dù thành công hay thất bại
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem("token");
      // console.log(token);

      // chưa có token
      if (!token) {
        setLoading(false);
        setIsLoggedIn(false);
        return;
      }

      loadProfile();
    }
    fetchProfile();
  }, []);

  //=========================== Hàm đăng nhập, cập nhật trạng thái và lưu token ===========================
  const login = async (token: string) => {
    // Lưu token vào localStorage
    localStorage.setItem("token", token);

    loadProfile();
  };

  // đăng xuất
  const logout = () => {
    localStorage.removeItem("token");
    setUsers(null);
    setIsLoggedIn(false);
  };

  console.log("info user full: ", user);
  // quên mật khẩu

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        user,
        login,
        logout,
        isAdmin: user?.role === ROLES.ADMIN,
        isUser: user?.role === ROLES.USER,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
