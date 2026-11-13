"use client";
import { useState } from "react";
import Link from "next/link";
import { Briefcase, Pencil, Trash2 } from "lucide-react";
import { deleteJob, getJobs } from "@/services/jobService";
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
import { humanize } from "@/utils/format";

export default function AdminJobsPage() {
  const toast = useToast();
  const { data, loading, error, reload } = useFetch(getJobs, []);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const { page, setPage, totalPages, pageItems } = usePagination(data || [], 10);

  const remove = async () => {
    setBusy(true);
    try { await deleteJob(target.id); toast.success("Job deleted."); setTarget(null); reload(); }
    catch (e) { toast.error(getErrorMessage(e, "Could not delete the job.")); }
    finally { setBusy(false); }
  };

  if (loading) return <PageLoader />;
  return (
    <>
      <PageHeader title="All jobs" subtitle="Create, edit and remove job listings." action={<Link href="/admin/jobs/new" className="btn-primary">Create job</Link>} />
      {error ? <ErrorNotice message={error} onRetry={reload} /> : data.length === 0 ? (
        <EmptyState icon={Briefcase} title="No jobs yet" message="Create your first job listing." action={<Link href="/admin/jobs/new" className="btn-primary">Create job</Link>} />
      ) : (
        <>
          <div className="table-wrap"><table>
            <thead><tr><th>Title</th><th>Company</th><th>Location</th><th>Type</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>{pageItems.map((j) => (
              <tr key={j.id}>
                <td className="font-medium"><Link href={`/jobs/${j.id}`} className="hover:text-brand-700">{j.title}</Link></td>
                <td>{j.companyName}</td><td>{j.location}</td><td>{humanize(j.employmentType)}</td><td><StatusBadge status={j.status} /></td>
                <td className="whitespace-nowrap text-right">
                  <Link href={`/admin/jobs/${j.id}/edit`} className="btn-ghost btn-sm"><Pencil className="h-4 w-4" />Edit</Link>
                  <button className="btn-ghost btn-sm text-red-600" onClick={() => setTarget(j)}><Trash2 className="h-4 w-4" />Delete</button>
                </td>
              </tr>
            ))}</tbody>
          </table></div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
      <ConfirmDialog open={!!target} title="Delete this job?" message={target ? `“${target.title}” will be permanently removed.` : ""} busy={busy} onConfirm={remove} onCancel={() => setTarget(null)} />
    </>
  );
}
