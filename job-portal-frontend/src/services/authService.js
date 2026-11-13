import api from "./api";
import { ENDPOINTS } from "@/config/endpoints";

// Backend: LoginRequestDto{email,password} -> LoginResponseDto{accessToken}
export async function loginRequest({ email, password }) {
  const { data } = await api.post(ENDPOINTS.auth.login, { email, password }, { skipAuth: true });
  const token = data?.accessToken; // single place to adjust the response mapping
  if (!token) throw new Error("Login response did not contain accessToken.");
  return token;
}

// Backend: UserRequestDto{email,password} -> UserResponseDto{message}
export async function registerRequest({ email, password }) {
  const { data } = await api.post(ENDPOINTS.auth.register, { email, password }, { skipAuth: true });
  return data?.message || "Registration successful.";
}
