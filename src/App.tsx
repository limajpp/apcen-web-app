import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./store/auth";
import { router } from "@/routes/router";

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
