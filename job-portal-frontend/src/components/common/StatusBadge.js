import { humanize } from "@/utils/format";

const STYLES = {
  PENDING: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  REVIEWED: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  SHORTLISTED: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  ACCEPTED: "bg-green-50 text-green-700 ring-1 ring-green-200",
  REJECTED: "bg-red-50 text-red-700 ring-1 ring-red-200",
  OPEN: "bg-green-50 text-green-700 ring-1 ring-green-200",
  CLOSED: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
};

export default function StatusBadge({ status }) {
  const key = String(status || "").toUpperCase();
  return <span className={`badge ${STYLES[key] || "bg-slate-100 text-slate-600"}`}>{humanize(status)}</span>;
}
