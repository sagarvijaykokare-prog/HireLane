"use client";
import Link from "next/link";
import { Briefcase, CheckCircle2, FileText, Clock } from "lucide-react";
import { getJobs } from "@/services/jobService";
import { getAllApplications } from "@/services/applicationService";
import useFetch from "@/hooks/useFetch";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/common/StatusBadge";
import ErrorNotice from "@/components/common/ErrorNotice";
import { PageLoader } from "@/components/common/Spinner";
import { formatDate } from "@/utils/format";

export default function AdminOverviewPage() {
  const { data, loading, error, reload } = useFetch(async () => {
    const [jobs, apps] = await Promise.all([getJobs(), getAllApplications()]);
    return { jobs, apps };
  }, []);

  if (loading) return <PageLoader />;
  if (error) return <ErrorNotice message={error} onRetry={reload} />;
  const { jobs, apps } = data;
  const open = jobs.filter((j) => String(j.status).toUpperCase() === "OPEN").length;
  const pending = apps.filter((a) => String(a.status).toUpperCase() === "PENDING").length;
  const titleOf = (id) => jobs.find((j) => j.id === id)?.title || `Job #${id}`;

  return (
    <>
      <PageHeader title="Admin overview" subtitle="Jobs and applications at a glance." action={<Link href="/admin/jobs/new" className="btn-primary">Create job</Link>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total jobs" value={jobs.length} icon={Briefcase} />
        <StatCard label="Open jobs" value={open} icon={CheckCircle2} tone="green" />
        <StatCard label="Applications" value={apps.length} icon={FileText} tone="blue" />
        <StatCard label="Pending review" value={pending} icon={Clock} tone="amber" />
      </div>
      <div className="mb-3 mt-8 flex items-center justify-between"><h2 className="text-lg font-semibold">Recent applications</h2><Link href="/admin/applications" className="text-sm font-semibold text-brand-700 hover:underline">View all</Link></div>
      {apps.length === 0 ? <p className="card text-sm text-slate-500">No applications received yet.</p> : (
        <div className="table-wrap"><table>
          <thead><tr><th>Job</th><th>Applicant ID</th><th>Applied</th><th>Status</th></tr></thead>
          <tbody>{[...apps].sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt)).slice(0, 5).map((a) => (
            <tr key={a.id}><td>{titleOf(a.jobId)}</td><td>{a.applicantId}</td><td>{formatDate(a.appliedAt)}</td><td><StatusBadge status={a.status} /></td></tr>
          ))}</tbody>
        </table></div>
      )}
    </>
  );
}
