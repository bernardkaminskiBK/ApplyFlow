import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number;
  nameid?: string;
  email?: string;
  role?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
};

export type AuthUser = {
  id: number;
  email: string;
  role: string;
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

export function getUserFromToken(token: string): AuthUser {
  const decodedToken = decodeToken(token);

  const id =
    decodedToken.nameid ??
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  const email =
    decodedToken.email ??
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];

  const role =
    decodedToken.role ??
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  return {
    id: Number(id),
    email: email ?? "",
    role: role ?? "User",
  };
}
