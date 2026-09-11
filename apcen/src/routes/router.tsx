import Auth from "@/pages/Auth";
import SlideAnalysis from "@/pages/SlideAnalysis";
import PrivateRoute from "@/components/PrivateRoute";

import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Auth />,
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
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
