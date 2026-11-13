// import api from "./api";
// import { ENDPOINTS } from "@/config/endpoints";

// // ⚠️ SECURITY: the backend currently takes ?userId= from the client. That is NOT
// // a security mechanism — any caller can send any id. This file is the ONLY place
// // that sends it. When the backend reads the user from the JWT, delete `params`
// // below and nothing else in the app needs to change.
// const withUser = (userId) => ({ params: userId != null ? { userId } : {} });
// const base = ENDPOINTS.profile;

// export const getProfile = async (userId) => (await api.get(base, withUser(userId))).data;
// export const createProfile = async (userId, payload) => (await api.post(base, payload, withUser(userId))).data;
// export const updateProfile = async (userId, payload) => (await api.put(base, payload, withUser(userId))).data;
// export const deleteProfile = async (userId) => (await api.delete(base, withUser(userId))).data;



import api from "./api";
import { ENDPOINTS } from "@/config/endpoints";

const base = ENDPOINTS.profile;

const withUser = (userId) => ({
    params: { userId },
});

// Create Profile
export const createProfile = async (userId, payload) =>
    (await api.post(base.create, payload, withUser(userId))).data;

// Get Profile
export const getProfile = async (userId) =>
    (await api.get(base.read, withUser(userId))).data;

// Update Profile
export const updateProfile = async (userId, payload) =>
    (await api.put(base.update, payload, withUser(userId))).data;

// Delete Profile
export const deleteProfile = async (userId) =>
    (await api.delete(base.delete, withUser(userId))).data;
