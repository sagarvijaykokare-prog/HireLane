// import api from "./api";
// import { ENDPOINTS } from "@/config/endpoints";

// const base = ENDPOINTS.jobs;

// // Some backends return a plain array, others a Spring Page {content:[...]}
// const toList = (d) => (Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);

// export const getJobs = async () => toList((await api.get(base)).data);
// export const getJobById = async (id) => (await api.get(`${base}/${id}`)).data;
// export const createJob = async (payload) => (await api.post(base, payload)).data;
// export const updateJob = async (id, payload) => (await api.put(`${base}/${id}`, payload)).data;
// export const deleteJob = async (id) => (await api.delete(`${base}/${id}`)).data;

import api from "./api";
import { ENDPOINTS } from "@/config/endpoints";

const toList = (d) =>
    Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : [];

// Create job
export const createJob = async (payload) =>
    (await api.post(ENDPOINTS.jobs.create, payload)).data;

// Read all jobs
export const getJobs = async () =>
    toList((await api.get(ENDPOINTS.jobs.read)).data);

// Get job by ID
export const getJobById = async (id) =>
    (await api.get(`${ENDPOINTS.jobs.base}/${id}`)).data;

// Update job
export const updateJob = async (id, payload) =>
    (await api.put(ENDPOINTS.jobs.update(id), payload)).data;

// Delete job
export const deleteJob = async (id) =>
    (await api.delete(ENDPOINTS.jobs.delete(id))).data;