"use client";
import { useState } from "react";
import Link from "next/link";
import { FileText, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { deleteApplication, getMyApplications } from "@/services/applicationService";
import { getJobs } from "@/services/jobService";
import { getErrorMessage } from "@/services/api";
import useFetch from "@/hooks/useFetch";
import usePagination from "@/hooks/usePagination";
import { useToast } from "@/components/common/Toast";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/common/StatusBadge";
import EmptyState from "@/components/common/EmptyState";
import ErrorNotice from "@/components/common/ErrorNotice";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Pagination from "@/components/common/Pagination";
import { PageLoader } from "@/components/common/Spinner";
import { formatDate } from "@/utils/format";

export default function MyApplicationsPage() {
  const { user } = useAuth();
  const toast = useToast();
  const { data, loading, error, reload } = useFetch(async () => {
    const [apps, jobs] = await Promise.all([getMyApplications(user?.userId), getJobs().catch(() => [])]);
    return { apps, jobs };
  }, [user?.userId]);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const { page, setPage, totalPages, pageItems } = usePagination(data?.apps || [], 10);

  const remove = async () => {
    setBusy(true);
    try { await deleteApplication(target.id); toast.success("Application withdrawn."); setTarget(null); reload(); }
    catch (e) { toast.error(getErrorMessage(e, "Could not withdraw the application.")); }
    finally { setBusy(false); }
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorNotice message={error} onRetry={reload} />;
  const titleOf = (id) => data.jobs.find((j) => j.id === id)?.title || `Job #${id}`;

  return (
    <>
      <PageHeader title="My applications" subtitle="Track the status of every job you applied for." />
      {data.apps.length === 0 ? (
        <EmptyState icon={FileText} title="No applications yet" message="When you apply for a job it will show up here." action={<Link href="/dashboard/jobs" className="btn-primary">Browse jobs</Link>} />
      ) : (
        <>
          <div className="table-wrap"><table>
            <thead><tr><th>Job</th><th>Applied on</th><th>Status</th><th>Resume</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>{pageItems.map((a) => (
              <tr key={a.id}>
                <td><Link className="font-medium hover:text-brand-700" href={`/dashboard/jobs/${a.jobId}`}>{titleOf(a.jobId)}</Link></td>
                <td>{formatDate(a.appliedAt)}</td>
                <td><StatusBadge status={a.status} /></td>
                <td>{a.resumeUrl ? <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">Open</a> : "—"}</td>
                <td className="text-right"><button className="btn-ghost btn-sm text-red-600" onClick={() => setTarget(a)} aria-label="Withdraw application"><Trash2 className="h-4 w-4" />Withdraw</button></td>
              </tr>
            ))}</tbody>
          </table></div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
      <ConfirmDialog open={!!target} title="Withdraw application?" message={target ? `Your application for “${titleOf(target.jobId)}” will be deleted.` : ""} confirmLabel="Withdraw" busy={busy} onConfirm={remove} onCancel={() => setTarget(null)} />
    </>
  );
}
