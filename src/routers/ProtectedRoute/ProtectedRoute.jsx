import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();
  const location = useLocation();

  if (!currentUser) {
    //user chưa đăng nhập=> redirect về login
    const url = `/log-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  return children || <Outlet />;
}
