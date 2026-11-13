"use client";
import Link from "next/link";
import { ArrowLeft, Briefcase, Building2, Clock, MapPin, Wallet } from "lucide-react";
import { getJobById } from "@/services/jobService";
import { useAuth } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import { PageLoader } from "@/components/common/Spinner";
import ErrorNotice from "@/components/common/ErrorNotice";
import EmptyState from "@/components/common/EmptyState";
import StatusBadge from "@/components/common/StatusBadge";
import { formatExperience, formatSalary, humanize, skillList } from "@/utils/format";
import ApplyForm from "./ApplyForm";

// mode: "public" (shows sign-in prompt) | "user" (shows apply form)
export default function JobDetails({ id, mode = "public", backHref = "/jobs" }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const { data: job, loading, error, reload } = useFetch(() => getJobById(id), [id]);

  if (loading) return <PageLoader label="Loading job…" />;
  if (error) {
    const notFound = /not found/i.test(error);
    return notFound
      ? <EmptyState title="Job not found" message="It may have been removed." action={<Link href={backHref} className="btn-primary">Back to jobs</Link>} />
      : <ErrorNotice message={error} onRetry={reload} />;
  }
  if (!job) return <EmptyState title="Job not found" action={<Link href={backHref} className="btn-primary">Back to jobs</Link>} />;

  const facts = [
    [Building2, "Company", job.companyName],
    [MapPin, "Location", `${job.location}${job.workMode ? " · " + humanize(job.workMode) : ""}`],
    [Clock, "Job type", humanize(job.employmentType)],
    [Briefcase, "Experience", formatExperience(job.experienceMin, job.experienceMax)],
    [Wallet, "Salary", formatSalary(job.salaryMin, job.salaryMax)],
  ];

  return (
    <div>
      <Link href={backHref} className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"><ArrowLeft className="h-4 w-4" />Back to jobs</Link>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-2xl font-bold">{job.title}</h1>
              {job.status && <StatusBadge status={job.status} />}
            </div>
            <p className="mt-1 text-slate-600">{job.companyName}</p>
            <h2 className="mt-6 text-lg font-semibold">About this role</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700">{job.description}</p>
            {skillList(job.skills).length > 0 && (
              <>
                <h2 className="mt-6 text-lg font-semibold">Skills</h2>
                <div className="mt-2 flex flex-wrap gap-2">{skillList(job.skills).map((s) => <span key={s} className="chip">{s}</span>)}</div>
              </>
            )}
          </div>
          {mode === "user" && !isAdmin && <ApplyForm job={job} />}
        </div>
        <aside className="space-y-4">
          <div className="card">
            <h2 className="mb-3 text-sm font-semibold text-slate-900">Job summary</h2>
            <dl className="space-y-3">
              {facts.map(([Icon, label, value]) => (
                <div key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 text-slate-400" />
                  <div><dt className="text-xs text-slate-500">{label}</dt><dd className="text-sm font-medium">{value}</dd></div>
                </div>
              ))}
            </dl>
          </div>
          {mode === "public" && (
            <div className="card">
              <p className="mb-3 text-sm text-slate-600">{isAuthenticated ? "Continue in your dashboard to apply." : "Sign in to apply for this job."}</p>
              {isAuthenticated
                ? <Link href={isAdmin ? "/admin/jobs" : `/dashboard/jobs/${job.id}`} className="btn-primary w-full">{isAdmin ? "Manage jobs" : "Apply now"}</Link>
                : <Link href={`/login?next=${encodeURIComponent(`/dashboard/jobs/${job.id}`)}`} className="btn-primary w-full">Sign in to apply</Link>}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
