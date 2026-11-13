"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import { getJobs } from "@/services/jobService";
import useFetch from "@/hooks/useFetch";
import usePagination from "@/hooks/usePagination";
import { EMPLOYMENT_TYPES, WORK_MODES } from "@/config/constants";
import { humanize } from "@/utils/format";
import { PageLoader } from "@/components/common/Spinner";
import ErrorNotice from "@/components/common/ErrorNotice";
import EmptyState from "@/components/common/EmptyState";
import Pagination from "@/components/common/Pagination";
import JobCard from "./JobCard";

// basePath: "/jobs" (public) or "/dashboard/jobs" (signed-in user)
export default function JobBrowser({ basePath }) {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [location, setLocation] = useState(params.get("location") || "");
  const [type, setType] = useState("");
  const [mode, setMode] = useState("");
  const { data, loading, error, reload } = useFetch(getJobs, []);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const ll = location.trim().toLowerCase();
    return (data || []).filter((j) =>
      (!ql || [j.title, j.companyName, j.skills, j.description].some((v) => v?.toLowerCase().includes(ql))) &&
      (!ll || j.location?.toLowerCase().includes(ll)) &&
      (!type || j.employmentType === type) &&
      (!mode || j.workMode === mode)
    );
  }, [data, q, location, type, mode]);

  const { page, setPage, totalPages, pageItems } = usePagination(filtered, 9);
  const clear = () => { setQ(""); setLocation(""); setType(""); setMode(""); };

  return (
    <div>
      <div className="card grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <input className="input pl-9" placeholder="Title, company or skill" value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} aria-label="Search jobs" />
        </div>
        <input className="input" placeholder="Location" value={location} onChange={(e) => { setLocation(e.target.value); setPage(1); }} aria-label="Location" />
        <select className="input" value={type} onChange={(e) => { setType(e.target.value); setPage(1); }} aria-label="Employment type">
          <option value="">All job types</option>
          {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{humanize(t)}</option>)}
        </select>
        <select className="input" value={mode} onChange={(e) => { setMode(e.target.value); setPage(1); }} aria-label="Work mode">
          <option value="">All work modes</option>
          {WORK_MODES.map((m) => <option key={m} value={m}>{humanize(m)}</option>)}
        </select>
      </div>

      <div className="mt-6">
        {loading ? <PageLoader label="Loading jobs…" /> : error ? <ErrorNotice message={error} onRetry={reload} /> :
          filtered.length === 0 ? (
            <EmptyState icon={SearchX} title="No jobs match your search" message="Try different keywords or remove a filter."
              action={<button className="btn-secondary" onClick={clear}>Clear filters</button>} />
          ) : (
            <>
              <p className="mb-3 text-sm text-slate-500">{filtered.length} {filtered.length === 1 ? "job" : "jobs"} found</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((j) => <JobCard key={j.id} job={j} href={`${basePath}/${j.id}`} />)}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
      </div>
    </div>
  );
}
