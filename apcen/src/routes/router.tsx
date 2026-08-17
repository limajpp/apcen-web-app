import Auth from "@/pages/Auth";
import SlideAnalysis from "@/pages/SlideAnalysis";
import PrivateRoute from "@/components/PrivateRoute";

import { createBrowserRouter, Navigate } from "react-router-dom";
import Goals from "@/pages/Goals";

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
        path: "goals",
        element: <Goals />,
      },
      {
        path: "slide-analysis",
        element: <SlideAnalysis />,
      },
    ],
  },
]);
