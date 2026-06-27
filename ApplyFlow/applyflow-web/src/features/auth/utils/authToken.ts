import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
};

export function isTokenExpired(token: string) {
  const decodedToken = jwtDecode<JwtPayload>(token);

  const expirationTime = decodedToken.exp * 1000;

  return Date.now() >= expirationTime;
}
