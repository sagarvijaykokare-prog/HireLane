export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
export const isPhone = (v) => /^[+]?[0-9\s-]{7,15}$/.test(v || "");
export const isUrl = (v) => { try { new URL(v); return true; } catch { return false; } };

export function validateLogin({ email, password }) {
  const e = {};
  if (!email) e.email = "Email is required";
  else if (!isEmail(email)) e.email = "Enter a valid email address";
  if (!password) e.password = "Password is required";
  return e;
}
export function validateRegister({ email, password, confirm }) {
  const e = validateLogin({ email, password });
  if (password && password.length < 4) e.password = "Password must be at least 4 characters"; // matches backend @Size(min=4)
  if (confirm !== password) e.confirm = "Passwords do not match";
  return e;
}
export function validateProfile(f) {
  const e = {};
  if (!f.fullName?.trim()) e.fullName = "Full name is required";
  if (!f.phone?.trim()) e.phone = "Phone is required";
  else if (!isPhone(f.phone)) e.phone = "Enter a valid phone number";
  if (!f.location?.trim()) e.location = "Location is required";
  if (f.experienceYears === "" || f.experienceYears === null || Number(f.experienceYears) < 0 || Number.isNaN(Number(f.experienceYears)))
    e.experienceYears = "Enter experience in years (0 or more)";
  if (f.resumeUrl && !isUrl(f.resumeUrl)) e.resumeUrl = "Enter a valid URL (https://...)";
  return e;
}
export function validateApplication(f) {
  const e = {};
  if (!f.coverLetter?.trim()) e.coverLetter = "Cover letter is required";
  if (!f.resumeUrl?.trim()) e.resumeUrl = "Resume URL is required";
  else if (!isUrl(f.resumeUrl)) e.resumeUrl = "Enter a valid URL (https://...)";
  return e;
}
export function validateJob(f) {
  const e = {};
  if (!f.title?.trim()) e.title = "Title is required";
  if (!f.companyName?.trim()) e.companyName = "Company is required";
  if (!f.location?.trim()) e.location = "Location is required";
  if (!f.description?.trim()) e.description = "Description is required";
  const n = (v) => v !== "" && v !== null && v !== undefined;
  if (n(f.experienceMin) && n(f.experienceMax) && Number(f.experienceMin) > Number(f.experienceMax)) e.experienceMax = "Max must be ≥ min";
  if (n(f.salaryMin) && n(f.salaryMax) && Number(f.salaryMin) > Number(f.salaryMax)) e.salaryMax = "Max must be ≥ min";
  return e;
}
