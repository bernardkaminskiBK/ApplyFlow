import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    logout();
    return;
  }

  return <>{children}</>;
}
