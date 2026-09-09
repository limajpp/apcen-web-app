import useAuth from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
