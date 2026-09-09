export interface User {
  id: string;
  username: string;
  role: "analyst" | "admin";
  goal: number | null;
}

export interface JwtPayload extends User {
  exp: number;
  iat: number;
  sub: string;
}

export type AccessTokenClaims = Pick<
  JwtPayload,
  "sub" | "username" | "exp" | "role" | "goal"
>;

export type DecodeReason =
  | "missing-token"
  | "malformed-token"
  | "expired-token"
  | "missing-claims"
  | "unknown-error";

export type DecodeResult =
  | { ok: true; returned: User }
  | { ok: false; reason: DecodeReason };
