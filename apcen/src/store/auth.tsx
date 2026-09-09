import { createContext, useState, type ReactNode } from "react";

import {
  clearStoredTokens,
  decodeUserFromToken,
  loadStoredUser,
  storeTokens,
} from "@/lib/jwt/jwt";

import { type User } from "@/lib/jwt/jwt.types";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  handleSetUser: (accessToken: string, refreshToken: string) => void;
  handleDisconnectUser: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const result = loadStoredUser();
    return result.ok ? result.returned : null;
  });

  const handleSetUser = (accessToken: string, refreshToken: string) => {
    storeTokens(accessToken, refreshToken);

    const result = decodeUserFromToken(accessToken);

    if (!result.ok) {
      clearStoredTokens();
      setUser(null);
      return;
    }

    setUser(result.returned);
  };

  const handleDisconnectUser = () => {
    clearStoredTokens();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        handleSetUser,
        handleDisconnectUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
