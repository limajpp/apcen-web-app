import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface UserCredentials {
  name: string;
  password: string;
}

interface AuthContextType {
  userCredentials: UserCredentials;
  setUserCredentials: Dispatch<SetStateAction<UserCredentials>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    name: "",
    password: "",
  });

  const ctx: AuthContextType = {
    userCredentials,
    setUserCredentials,
  };

  return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}
