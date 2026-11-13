"use client";
import { Fragment, useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import { deleteApplication, getAllApplications, updateApplicationStatus } from "@/services/applicationService";
import { getJobs } from "@/services/jobService";
import { getErrorMessage } from "@/services/api";
import { APPLICATION_STATUSES } from "@/config/constants";
import useFetch from "@/hooks/useFetch";
import usePagination from "@/hooks/usePagination";
import { useToast } from "@/components/common/Toast";
import PageHeader from "@/components/dashboard/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import ErrorNotice from "@/components/common/ErrorNotice";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Pagination from "@/components/common/Pagination";
import { PageLoader } from "@/components/common/Spinner";
import { formatDate, humanize } from "@/utils/format";

export default function AdminApplicationsPage() {
  const toast = useToast();
  const { data, loading, error, reload, setData } = useFetch(async () => {
    const [apps, jobs] = await Promise.all([getAllApplications(), getJobs().catch(() => [])]);
    return { apps, jobs };
  }, []);
  const [filter, setFilter] = useState("");
  const [open, setOpen] = useState(null);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  const [savingId, setSavingId] = useState(null);
  const list = (data?.apps || []).filter((a) => !filter || String(a.status).toUpperCase() === filter);
  const { page, setPage, totalPages, pageItems } = usePagination(list, 10);

  const changeStatus = async (a, status) => {
    setSavingId(a.id);
    try {
      await updateApplicationStatus(a.id, status);
      setData((d) => ({ ...d, apps: d.apps.map((x) => (x.id === a.id ? { ...x, status } : x)) }));
      toast.success(`Status changed to ${humanize(status).toLowerCase()}.`);
    } catch (e) { toast.error(getErrorMessage(e, "Could not update the status.")); }
    finally { setSavingId(null); }
  };

  const remove = async () => {
    setBusy(true);
    try { await deleteApplication(target.id); toast.success("Application deleted."); setTarget(null); reload(); }
    catch (e) { toast.error(getErrorMessage(e, "Could not delete the application.")); }
    finally { setBusy(false); }
  };

  if (loading) return <PageLoader />;
  if (error) return <ErrorNotice message={error} onRetry={reload} />;
  const job = (id) => data.jobs.find((j) => j.id === id);

  return (
    <>
      <PageHeader title="Applications" subtitle="Review candidates and update their status." action={
        <select className="input w-auto" value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1); }} aria-label="Filter by status">
          <option value="">All statuses</option>{APPLICATION_STATUSES.map((s) => <option key={s} value={s}>{humanize(s)}</option>)}
        </select>} />
      {list.length === 0 ? <EmptyState icon={FileText} title="No applications" message={filter ? "No applications have this status." : "Applications will appear here when candidates apply."} /> : (
        <>
          <div className="table-wrap"><table>
            <thead><tr><th>Job</th><th>Applicant ID</th><th>Applied</th><th>Resume</th><th>Status</th><th><span className="sr-only">Actions</span></th></tr></thead>
            <tbody>{pageItems.map((a) => (
              <Fragment key={a.id}>
                <tr>
                  <td className="font-medium">{job(a.jobId)?.title || `Job #${a.jobId}`}<div className="text-xs font-normal text-slate-500">{job(a.jobId)?.companyName}</div></td>
                  <td>{a.applicantId}</td><td>{formatDate(a.appliedAt)}</td>
                  <td>{a.resumeUrl ? <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">Open</a> : "—"}</td>
                  <td><select className="input w-auto py-1.5" value={String(a.status || "").toUpperCase()} disabled={savingId === a.id} onChange={(e) => changeStatus(a, e.target.value)} aria-label="Application status">
                    {!APPLICATION_STATUSES.includes(String(a.status).toUpperCase()) && <option value={a.status}>{humanize(a.status)}</option>}
                    {APPLICATION_STATUSES.map((s) => <option key={s} value={s}>{humanize(s)}</option>)}</select></td>
                  <td className="whitespace-nowrap text-right">
                    <button className="btn-ghost btn-sm" onClick={() => setOpen(open === a.id ? null : a.id)}>{open === a.id ? "Hide" : "Cover letter"}</button>
                    <button className="btn-ghost btn-sm text-red-600" onClick={() => setTarget(a)} aria-label="Delete application"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
                {open === a.id && <tr><td colSpan={6} className="bg-slate-50"><p className="whitespace-pre-line text-sm text-slate-700">{a.coverLetter || "No cover letter provided."}</p></td></tr>}
              </Fragment>
            ))}</tbody>
          </table></div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
      <ConfirmDialog open={!!target} title="Delete this application?" message="This permanently removes the application." busy={busy} onConfirm={remove} onCancel={() => setTarget(null)} />
    </>
  );
}
