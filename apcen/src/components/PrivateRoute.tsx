import useAuth from "@/hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-brand-cream text-brand-blue-deep">
        Carregando...
      </div>
    );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
