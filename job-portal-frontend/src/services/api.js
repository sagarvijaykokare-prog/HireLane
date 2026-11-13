import axios from "axios";
import { API_BASE_URL, TOKEN_STORAGE_KEY } from "@/config/endpoints";

const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000, headers: { "Content-Type": "application/json" } });

// Attach JWT to every request except those flagged { skipAuth: true }
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined" && !config.skipAuth) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    // 401 on a protected call = missing/invalid/expired token -> force re-login
    if (status === 401 && typeof window !== "undefined" && !error.config?.skipAuth) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.dispatchEvent(new Event("auth:expired"));
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error?.response) {
    if (error?.code === "ECONNABORTED") return "The request timed out. Please try again.";
    if (error?.request) return "Cannot reach the server. Check that the API Gateway is running on port 8080.";
    return error?.message || fallback;
  }
  const { status, data } = error.response;
  if (status === 401) return "Your session is invalid or has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to do this.";
  if (status === 404) return (typeof data === "object" && data?.message) || "The requested item was not found.";
  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (data?.error) return data.error;
  if (data && typeof data === "object") {
    const vals = Object.values(data).filter((v) => typeof v === "string");
    if (vals.length) return vals.join(". "); // field-validation map
  }
  return fallback;
}

export default api;
