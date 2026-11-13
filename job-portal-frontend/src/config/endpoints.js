
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

// export const ENDPOINTS = {
//   auth: { login: "/api/auth/login", register: "/api/auth/register" },
//   jobs: "/api/job",
//   applications: "/api/application",
//   profile: "/api/profile",
//   admin: "/api/admin", // routed to auth-service; no UI contract known yet
// };


// export const ENDPOINTS = {
//   auth: {
//     login: "/api/auth/login",
//     register: "/api/auth/register",
//   },
//   jobs: "/api/job",
//   applications: {
//     base: "/api/application",
//     apply: "/api/application/apply",
//     all: "/api/application/data",
//     updateStatus: (id) => `/api/application/${id}/status`,
//         delete: (id) => `/api/application/delete/${id}`,
//     },
//     profile: "/api/profile",
//     admin: "/api/admin",
//   };

// export const ENDPOINTS = {
//   auth: {
//     login: "/api/auth/login",
//     register: "/api/auth/register",
//   },

//   jobs: {
//     base: "/api/job",
//     create: "/api/job/create",
//     read: "/api/job/read",
//     update: (id) => `/api/job/update/${id}`,
//     delete: (id) => `/api/job/delete/${id}`,
//   },

//   applications: {
//     base: "/api/application",
//     apply: "/api/application/apply",
//     all: "/api/application/data",
//     updateStatus: (id) => `/api/application/${id}/status`,
//     delete: (id) => `/api/application/delete/${id}`,
//   },

//   profile: "/api/profile",

//   admin: "/api/admin",
// };

export const ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
  },

  jobs: {
    base: "/api/job",
    create: "/api/job/create",
    read: "/api/job/read",
    update: (id) => `/api/job/update/${id}`,
    delete: (id) => `/api/job/delete/${id}`,
  },

  applications: {
    base: "/api/application",
    apply: "/api/application/apply",
    all: "/api/application/data",
    updateStatus: (id) => `/api/application/${id}/status`,
    delete: (id) => `/api/application/delete/${id}`,
  },

  profile: {
    base: "/api/profile",
    create: "/api/profile",
    read: "/api/profile",
    update: "/api/profile",
    delete: "/api/profile",
  },

  admin: "/api/admin",
};
  
  export const JWT_CLAIMS = {
    roles: ["authorities", "roles", "role", "scope", "scp"],
    userId: ["userId", "user_id", "uid", "id", "sub"],
    email: ["email", "sub"],
  };
  
  export const TOKEN_STORAGE_KEY = "jobportal_token";
