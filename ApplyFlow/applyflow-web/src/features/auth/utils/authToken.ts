import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
};

function decodeToken(token: string) {
  return jwtDecode<JwtPayload>(token);
}

export function getTokenExpirationTime(token: string) {
  return decodeToken(token).exp * 1000;
}

export function isTokenExpired(token: string) {
  return Date.now() >= getTokenExpirationTime(token);
}

export function getTokenRemainingTime(token: string) {
  return getTokenExpirationTime(token) - Date.now();
}
