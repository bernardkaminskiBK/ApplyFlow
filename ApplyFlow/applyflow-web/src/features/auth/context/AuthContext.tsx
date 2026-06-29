import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../api/authApi";
import { register as registerRequest } from "../api/authApi";
import { isTokenExpired } from "../utils/authToken";

type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
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

  const isAuthenticated = token != null && !isTokenExpired(token);

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

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated,
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
