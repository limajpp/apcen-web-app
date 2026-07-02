import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import PrivateRoute from "@/components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <PrivateRoute />,
    children: [],
  },
]);
