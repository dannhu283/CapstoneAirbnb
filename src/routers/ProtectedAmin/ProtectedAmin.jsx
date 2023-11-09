import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext/UserContext";

export default function ProtectedAmin({ children }) {
  const { currentUser } = useUserContext();
  const location = useLocation();

  if (!currentUser) {
    const url = `/log-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  if (currentUser?.role !== "admin") {
    return <Navigate to="/Access" replace />;
  }
  return children || <Outlet />;
}
