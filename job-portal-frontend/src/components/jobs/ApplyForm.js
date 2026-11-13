"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/common/Toast";
import { applyForJob } from "@/services/applicationService";
import { getProfile } from "@/services/profileService";
import { getErrorMessage } from "@/services/api";
import { validateApplication } from "@/utils/validators";
import FormField from "@/components/common/FormField";
import { Spinner } from "@/components/common/Spinner";

export default function ApplyForm({ job }) {
  const { user } = useAuth();
  const toast = useToast();
  const [form, setForm] = useState({ coverLetter: "", resumeUrl: "" });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // Convenience: pre-fill resume URL from the user's profile if one exists
  useEffect(() => {
    if (user?.userId == null) return;
    getProfile(user.userId).then((p) => p?.resumeUrl && setForm((f) => ({ ...f, resumeUrl: f.resumeUrl || p.resumeUrl }))).catch(() => {});
  }, [user?.userId]);

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateApplication(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (user?.userId == null) {
      toast.error("Your token has no numeric user id, so we cannot set applicantId. See README → Backend assumptions.");
      return;
    }
    setBusy(true);
    try {
      await applyForJob({ jobId: job.id, applicantId: user.userId, coverLetter: form.coverLetter.trim(), resumeUrl: form.resumeUrl.trim() });
      setDone(true);
      toast.success("Application submitted.");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not submit your application."));
    } finally { setBusy(false); }
  };

  if (done) {
    return (
      <div className="card text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />
        <h3 className="mt-3 text-lg font-semibold">Application submitted</h3>
        <p className="mt-1 text-sm text-slate-500">We’ll show updates on your applications page.</p>
        <Link href="/dashboard/applications" className="btn-primary mt-4">View my applications</Link>
      </div>
    );
  }

  const closed = String(job.status || "").toUpperCase() === "CLOSED";
  return (
    <form onSubmit={submit} className="card space-y-4" noValidate>
      <h3 className="text-lg font-semibold">Apply for this job</h3>
      {closed && <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">This job is closed. Your application may be rejected.</p>}
      <FormField label="Cover letter" error={errors.coverLetter} htmlFor="coverLetter">
        <textarea id="coverLetter" rows={6} className={`input ${errors.coverLetter ? "input-error" : ""}`} value={form.coverLetter}
          onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} placeholder="Tell the team why you’re a good fit." />
      </FormField>
      <FormField label="Resume URL" error={errors.resumeUrl} htmlFor="resumeUrl" hint="Link to your resume (Google Drive, Dropbox, portfolio…)">
        <input id="resumeUrl" className={`input ${errors.resumeUrl ? "input-error" : ""}`} value={form.resumeUrl}
          onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })} placeholder="https://" />
      </FormField>
      <button className="btn-primary" disabled={busy}>{busy && <Spinner className="h-4 w-4" />}Submit application</button>
    </form>
  );
}
