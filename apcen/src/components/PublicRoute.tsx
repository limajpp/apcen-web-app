import useAuth from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/slide-analysis" replace />
  ) : (
    <Outlet />
  );
}
