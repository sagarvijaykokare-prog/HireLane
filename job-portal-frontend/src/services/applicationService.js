// import api from "./api";
// import { ENDPOINTS } from "@/config/endpoints";

// const base = ENDPOINTS.applications;
// const toList = (d) => (Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);

// // ApplicationRequestDto{jobId, applicantId, coverLetter, resumeUrl}
// export const applyForJob = async (payload) => (await api.post(base, payload)).data;

// // Admin: all applications.
// export const getAllApplications = async () => toList((await api.get(base)).data);

// // User: "my applications". The backend contract is unconfirmed, so we send
// // ?applicantId= AND filter again client-side. See README -> backend must enforce this.
// export async function getMyApplications(applicantId) {
//   const list = toList((await api.get(base, { params: applicantId ? { applicantId } : {} })).data);
//   return applicantId ? list.filter((a) => a.applicantId == null || Number(a.applicantId) === Number(applicantId)) : list;
// }

// // ASSUMPTION: PUT /api/application/{id} accepts { status }. Adjust here if different.
// export const updateApplicationStatus = async (id, status) => (await api.put(`${base}/${id}`, { status })).data;
// export const deleteApplication = async (id) => (await api.delete(`${base}/${id}`)).data;

import api from "./api";
import { ENDPOINTS } from "@/config/endpoints";

const toList = (d) =>
    Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : [];

// Apply for a job
export const applyForJob = async (payload) =>
    (await api.post(ENDPOINTS.applications.apply, payload)).data;

// Get all applications
export const getAllApplications = async () =>
    toList((await api.get(ENDPOINTS.applications.all)).data);

// Get my applications
export async function getMyApplications(applicantId) {
    const list = toList(
        (await api.get(ENDPOINTS.applications.all)).data
    );

    return applicantId
        ? list.filter((a) => Number(a.applicantId) === Number(applicantId))
        : list;
}

// Update application status
export const updateApplicationStatus = async (id, status) =>
    (await api.put(
        ENDPOINTS.applications.updateStatus(id),
        null,
        { params: { status } }
    )).data;

// Delete application
export const deleteApplication = async (id) =>
    (await api.delete(ENDPOINTS.applications.delete(id))).data;