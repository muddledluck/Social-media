import { jwtDecode } from "jwt-decode";

export interface JWTUser {
  sub: string;
  isVerified: boolean;
  aud: string;
  iss: string;
  iat: number;
  exp: number;
}

export const accessTokenKey = "access-token";
export const refreshTokenKey = "refresh-token";

const secondsInMinute = 60;

export const decodeJwt = (jwt: string): JWTUser => jwtDecode<JWTUser>(jwt);
/**
 * Checks the expiration of the token.
 *
 * @param timeRemaining Check if the access token has less than or equal to
 *                      this time remaining (in seconds).
 * @returns Boolean whether or not the token is valid (not expired).
 */
export const tokenStillValid = (
  token: JWTUser | string,
  timeRemaining = 0
): boolean => {
  if (typeof token === "string") {
    token = decodeJwt(token);
  }
  return token.exp - Date.now() / 1000 > timeRemaining;
};
// Refresh if the access token has less than or equal to this time remaining (in seconds).
export const REFRESH_TIME_REMAINING = 5 * secondsInMinute;
