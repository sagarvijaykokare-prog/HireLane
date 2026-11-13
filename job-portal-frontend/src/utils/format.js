export const formatDate = (d) => {
  if (!d) return "—";
  const date = new Date(d);
  return isNaN(date) ? "—" : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
};
export const humanize = (s) => (s ? String(s).replace(/_/g, " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase()) : "—");
export const formatSalary = (min, max) => {
  const f = (n) => Number(n).toLocaleString();
  if (min && max) return `${f(min)} – ${f(max)}`;
  if (min) return `From ${f(min)}`;
  if (max) return `Up to ${f(max)}`;
  return "Not disclosed";
};
export const formatExperience = (min, max) => {
  if (min != null && max != null) return `${min}–${max} yrs`;
  if (min != null) return `${min}+ yrs`;
  return "Any";
};
export const skillList = (s) => (s ? String(s).split(",").map((x) => x.trim()).filter(Boolean) : []);
