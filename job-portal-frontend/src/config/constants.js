// Enum-like values are ASSUMPTIONS (your DTOs use plain Strings).
// Change them here if your backend validates specific values.
export const EMPLOYMENT_TYPES = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"];
export const WORK_MODES = ["ONSITE", "REMOTE", "HYBRID"];
export const JOB_STATUSES = ["OPEN", "CLOSED"];
export const APPLICATION_STATUSES = ["PENDING", "REVIEWED", "SHORTLISTED", "ACCEPTED", "REJECTED"];

export const CATEGORIES = [
  { name: "Software Engineering", query: "developer" },
  { name: "Data & Analytics", query: "data" },
  { name: "Design", query: "designer" },
  { name: "Marketing", query: "marketing" },
  { name: "Sales", query: "sales" },
  { name: "Finance", query: "finance" },
  { name: "Customer Support", query: "support" },
  { name: "Human Resources", query: "hr" },
];
