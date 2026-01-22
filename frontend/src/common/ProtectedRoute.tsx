import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";
import { ROLES } from "./constants";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // tự động chuyển về đúng path theo role khi có nhấn nhầm qua path khác role
    if (user.role === ROLES.ADMIN) {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
