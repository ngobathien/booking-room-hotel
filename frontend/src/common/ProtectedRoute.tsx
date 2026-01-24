import React, { useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router";
import LoadingSkeleton from "./LoadingSkeleton";

const ProtectedRoute = ({ allowedRoles, children }) => {
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

  return children;
};

export default ProtectedRoute;
