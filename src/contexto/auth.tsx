import { loginUsuario } from "@/controllers/usuarios";
import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
});

export interface AuthProvider {
  children?: React.ReactNode;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProvider) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const login = async (email: string, senha: string) => {
    try {
      const response = await loginUsuario(email, senha);
      if ("error" in response) {
        console.error("Erro ao fazer login:", response.error);
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};
