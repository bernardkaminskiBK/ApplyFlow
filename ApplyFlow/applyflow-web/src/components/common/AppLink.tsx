import { Link } from "react-router-dom";

type AppLinkProps = {
  to: string;
  children: React.ReactNode;
};

export default function AppLink({ to, children }: AppLinkProps) {
  return (
    <Link
      to={to}
      style={{ color: "inherit", textDecoration: "none", fontWeight: "bold" }}
    >
      {children}
    </Link>
  );
}
