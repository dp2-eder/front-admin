import { useState, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import type { AuthUser, DecodedToken } from "../types/types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    try {
      if (token) {
        const decoded = jwtDecode<DecodedToken>(token);

        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            id: decoded.sub,
            usuario: decoded.usuario,
            role: decoded.type || "admin",
          });
        } else {
          localStorage.removeItem("authToken");
        }
      }
    } catch (error) {
      console.error("Token inválido", error);
      localStorage.removeItem("authToken");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    const decoded = jwtDecode<DecodedToken>(token);
    setUser({
      id: decoded.sub,
      usuario: decoded.usuario,
      role: decoded.type || "admin",
    });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
