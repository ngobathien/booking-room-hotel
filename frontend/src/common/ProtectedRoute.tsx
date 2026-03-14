import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/auth/useAuth";
import LoadingSkeleton from "./LoadingSkeleton";

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isLoggedIn, isAdmin, loading } = useAuth();

  // ⛔ CHỜ load profile xong
  if (loading) {
    return <LoadingSkeleton />;
  }

  // ⛔ CHƯA LOGIN
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ LOGIN RỒI nhưng CHƯA CÓ USER (đang fetch profile)
  if (!user) {
    return <LoadingSkeleton />;
  }

  // ⛔ SAI ROLE
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return isAdmin ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
