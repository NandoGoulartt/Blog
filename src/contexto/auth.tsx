import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (email: string, senha: string) => Promise<any>;
  logout: () => void;
  dadosSessao: any;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: async () => {},
  logout: () => {},
  dadosSessao: null,
});

export interface AuthProviderProps {
  children?: React.ReactNode;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [dadosSessao, setDadosSessao] = useState<any>(null);

  useEffect(() => {
    const sessionData = Cookies.get("dadosSessao");
    if (sessionData) {
      setDadosSessao(JSON.parse(sessionData));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, senha: string): Promise<Response | void> => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("dadosSessao", JSON.stringify(data));
        setIsLoggedIn(true);
        setDadosSessao(data);
      } else {
        setIsLoggedIn(false);
        console.error("Erro ao fazer login:", response.statusText);
      }
      return response;
    } catch (error) {
      setIsLoggedIn(false);
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = (): void => {
    Cookies.remove("dadosSessao");
    setIsLoggedIn(false);
    setDadosSessao(null);
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout, dadosSessao }}>{children}</AuthContext.Provider>;
};
