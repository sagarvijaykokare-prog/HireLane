import { JWT_CLAIMS } from "@/config/endpoints";

export function decodeToken(token) {
  try {
    const part = token.split(".")[1];
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const p = decodeToken(token);
  if (!p) return true;
  if (!p.exp) return false;
  return p.exp * 1000 <= Date.now();
}

function firstClaim(payload, names) {
  for (const n of names) if (payload[n] !== undefined && payload[n] !== null) return payload[n];
  return undefined;
}

// Accepts ["ROLE_ADMIN"], "ROLE_ADMIN ROLE_USER", or [{authority:"ROLE_ADMIN"}]
export function extractRoles(payload) {
  const raw = firstClaim(payload, JWT_CLAIMS.roles);
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw : String(raw).split(/[\s,]+/);
  return list
    .map((r) => (typeof r === "object" ? r.authority || r.role : r))
    .filter(Boolean)
    .map((r) => (String(r).startsWith("ROLE_") ? String(r) : "ROLE_" + String(r).toUpperCase()));
}

export function userFromToken(token) {
  const payload = decodeToken(token);
  if (!payload) return null;
  const roles = extractRoles(payload);
  const rawId = firstClaim(payload, JWT_CLAIMS.userId);
  const numericId = rawId !== undefined && /^\d+$/.test(String(rawId)) ? Number(rawId) : null;
  return {
    email: firstClaim(payload, JWT_CLAIMS.email) || "",
    userId: numericId, // null if the token carries no numeric user id (see README)
    roles,
    isAdmin: roles.includes("ROLE_ADMIN"),
  };
}
