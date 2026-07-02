import { AuthContext } from "@/store/auth";
import { useContext } from "react";

export default function useAuth() {
  const ctx = useContext(AuthContext);

  if (ctx === undefined)
    throw new Error("'useAuth' must be used within an 'AuthProvider'.");

  return ctx;
}
