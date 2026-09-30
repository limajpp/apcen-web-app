import { InvalidTokenError, jwtDecode } from "jwt-decode";
import type { AccessTokenClaims, DecodeResult } from "./jwt.types";

export const clearStoredTokens = () => {
  localStorage.removeItem("@App:token");
  localStorage.removeItem("@App:refreshToken");
};

export const storeTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("@App:token", accessToken);
  localStorage.setItem("@App:refreshToken", refreshToken);
};

export const decodeUserFromToken = (
  accessToken: string,
  { allowExpired = false }: { allowExpired?: boolean } = {},
): DecodeResult => {
  let claims: AccessTokenClaims;

  try {
    claims = jwtDecode<AccessTokenClaims>(accessToken);
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      console.warn(`Malformed access token: ${error.message}`);
      return { ok: false, reason: "malformed-token" };
    }

    console.warn("Unexpected error while decoding the access token.", error);
    return { ok: false, reason: "unknown-error" };
  }

  const { sub: id, username, exp, role, goal } = claims;

  if (!id || !username) return { ok: false, reason: "missing-claims" };
  if (!allowExpired && exp && exp * 1000 <= Date.now())
    return { ok: false, reason: "expired-token" };

  return { ok: true, returned: { id, username, role, goal } };
};

export const loadStoredUser = (): DecodeResult => {
  const token = localStorage.getItem("@App:token");

  if (!token) return { ok: false, reason: "missing-token" };

  const canRefresh = localStorage.getItem("@App:refreshToken") !== null;
  const result = decodeUserFromToken(token, { allowExpired: canRefresh });

  if (!result.ok) clearStoredTokens();

  return result;
};
