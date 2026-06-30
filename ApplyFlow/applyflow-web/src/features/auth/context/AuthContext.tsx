import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/authApi";
import { register as registerRequest } from "../api/authApi";
import {
  getTokenRemainingTime,
  getUserFromToken,
  isTokenExpired,
  type AuthUser,
} from "../utils/authToken";

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  const user = token && !isTokenExpired(token) ? getUserFromToken(token) : null;
  const isAuthenticated = user != null;

  async function login(email: string, password: string) {
    const response = await loginRequest({
      email,
      password,
    });

    localStorage.setItem("token", response.token);
    setToken(response.token);

    navigate("/");
  }

  async function register(email: string, password: string) {
    await registerRequest({
      email,
      password,
    });

    navigate("/login", {
      replace: true,
      state: {
        successMessage: "Registration completed successfully. Please sign in.",
      },
    });
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);

    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (!token) return;

    const remainingTime = getTokenRemainingTime(token);

    if (remainingTime <= 0) {
      logout();
      return;
    }

    const timeoutId = setTimeout(() => {
      logout();
    }, remainingTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}
