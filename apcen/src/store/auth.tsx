import { createContext, useState, useEffect, type ReactNode } from "react";
import { api } from "@/services/api";

export interface User {
  id: string;
  username: string;
  createdAt: string;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const token = localStorage.getItem("@App:token");

      if (token) {
        try {
          const response = await api.get("/user/me");
          setUser(response.data);
        } catch (error) {
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    loadStorageData();
  }, []);

  const login = async (accessToken: string, refreshToken: string) => {
    localStorage.setItem("@App:token", accessToken);
    localStorage.setItem("@App:refreshToken", refreshToken);

    try {
      const response = await api.get("/user/me");
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem("@App:token");
      localStorage.removeItem("@App:refreshToken");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:refreshToken");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
