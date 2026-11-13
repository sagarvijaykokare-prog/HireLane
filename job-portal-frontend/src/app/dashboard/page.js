"use client";
import Link from "next/link";
import { FileText, Clock, CheckCircle2, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getMyApplications } from "@/services/applicationService";
import { getProfile } from "@/services/profileService";
import { getJobs } from "@/services/jobService";
import useFetch from "@/hooks/useFetch";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import JobCard from "@/components/jobs/JobCard";
import StatusBadge from "@/components/common/StatusBadge";
import { PageLoader } from "@/components/common/Spinner";
import ErrorNotice from "@/components/common/ErrorNotice";
import { formatDate } from "@/utils/format";

export default function UserOverviewPage() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useFetch(async () => {
    const [apps, jobs, profile] = await Promise.all([
      getMyApplications(user?.userId),
      getJobs().catch(() => []),
      getProfile(user?.userId).catch(() => null), // 404 = no profile yet
    ]);
    return { apps, jobs, profile };
  }, [user?.userId]);

  if (loading) return <PageLoader />;
  if (error) return <ErrorNotice message={error} onRetry={reload} />;
  const { apps, jobs, profile } = data;
  const pending = apps.filter((a) => String(a.status).toUpperCase() === "PENDING").length;
  const accepted = apps.filter((a) => String(a.status).toUpperCase() === "ACCEPTED").length;

  return (
    <>
      <PageHeader title={`Welcome${profile?.fullName ? ", " + profile.fullName.split(" ")[0] : ""}`} subtitle="Here’s where your job search stands." />
      {!profile && (
        <div className="mb-6 flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-amber-900">You haven’t created a profile yet. Add your skills and resume link so applying is faster.</p>
          <Link href="/dashboard/profile" className="btn-primary btn-sm">Create profile</Link>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Applications" value={apps.length} icon={FileText} />
        <StatCard label="Pending" value={pending} icon={Clock} tone="amber" />
        <StatCard label="Accepted" value={accepted} icon={CheckCircle2} tone="green" />
        <StatCard label="Profile" value={profile ? "Complete" : "Missing"} icon={UserCircle} tone="blue" />
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold">Recent applications</h2>
      {apps.length === 0 ? <p className="card text-sm text-slate-500">You haven’t applied to any jobs yet.</p> : (
        <div className="table-wrap"><table>
          <thead><tr><th>Job</th><th>Applied</th><th>Status</th></tr></thead>
          <tbody>{apps.slice(0, 5).map((a) => (
            <tr key={a.id}><td><Link className="font-medium hover:text-brand-700" href={`/dashboard/jobs/${a.jobId}`}>{jobs.find((j) => j.id === a.jobId)?.title || `Job #${a.jobId}`}</Link></td><td>{formatDate(a.appliedAt)}</td><td><StatusBadge status={a.status} /></td></tr>
          ))}</tbody>
        </table></div>
      )}

      <div className="mb-3 mt-8 flex items-center justify-between"><h2 className="text-lg font-semibold">Latest jobs</h2><Link href="/dashboard/jobs" className="text-sm font-semibold text-brand-700 hover:underline">See all</Link></div>
      {jobs.length === 0 ? <p className="card text-sm text-slate-500">No jobs posted yet.</p> :
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{jobs.slice(0, 3).map((j) => <JobCard key={j.id} job={j} href={`/dashboard/jobs/${j.id}`} />)}</div>}
    </>
  );
}
