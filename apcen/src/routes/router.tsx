import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import PrivateRoute from "@/components/PrivateRoute";
import SlideAnalysis from "@/pages/SlideAnalysis";

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
    children: [
      {
        path: "slide-analysis",
        element: <SlideAnalysis />,
      },
    ],
  },
]);
