import { createContext, use, useContext, useEffect, useState } from "react";
import { ROLES } from "../common/constants";

type User = {
  role: string;
  fullName?: string;
  email?: string;
};
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(ROLES.USER); // role mặc định là USER

  // =========================== lấy thông tin user ===========================
  // const [user, setUser] = useState(() => {
  //   // lấy infoUser từ localStorage
  //   const infoUser = localStorage.getItem("infoUser");

  //   // parse infoUser từ chuỗi JSON sang đối tượng
  //   const parsedInfoUser = JSON.parse(infoUser);

  //   // nếu infoUser tồn tại thì trả về đối tượng đã parse, nếu không thì trả về null
  //   return infoUser ? parsedInfoUser : null;
  // });

  // =========================== lấy thông tin user ===========================
  // nhớ đọc lại để hiểu logic này
  // load thông tin user từ localStorage khi component được mount
  const [user, setUser] = useState(null);

  // chỉ check localStorage MỘT LẦN
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("infoUser");

    if (token && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  //=========================== trạng thái đăng nhập ===========================
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //=========================== Hàm đăng nhập, cập nhật trạng thái và lưu thông tin user ===========================
  const login = (loginUser: User, token: string) => {
    // Lưu token vào localStorage
    localStorage.setItem("infoUser", JSON.stringify(loginUser));
    localStorage.setItem("token", token);
    setUser(loginUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("infoUser");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        role,
        setRole,
        // isAdmin,
        // isUser,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
