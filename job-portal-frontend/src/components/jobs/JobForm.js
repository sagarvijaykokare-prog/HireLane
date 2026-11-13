"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob, updateJob } from "@/services/jobService";
import { getErrorMessage } from "@/services/api";
import { useToast } from "@/components/common/Toast";
import { validateJob } from "@/utils/validators";
import { EMPLOYMENT_TYPES, JOB_STATUSES, WORK_MODES } from "@/config/constants";
import { humanize } from "@/utils/format";
import FormField from "@/components/common/FormField";
import { Spinner } from "@/components/common/Spinner";

const EMPTY = { title: "", description: "", companyName: "", location: "", employmentType: EMPLOYMENT_TYPES[0], workMode: WORK_MODES[0],
  experienceMin: "", experienceMax: "", salaryMin: "", salaryMax: "", skills: "", status: JOB_STATUSES[0] };

const num = (v) => (v === "" || v === null || v === undefined ? null : Number(v));

// Builds the JobCreateDto payload
function toPayload(f) {
  return { title: f.title.trim(), description: f.description.trim(), companyName: f.companyName.trim(), location: f.location.trim(),
    employmentType: f.employmentType, workMode: f.workMode, experienceMin: num(f.experienceMin), experienceMax: num(f.experienceMax),
    salaryMin: num(f.salaryMin), salaryMax: num(f.salaryMax), skills: f.skills.trim(), status: f.status };
}

export default function JobForm({ job }) {
  const router = useRouter();
  const toast = useToast();
  const editing = !!job;
  const [form, setForm] = useState(job ? Object.fromEntries(Object.keys(EMPTY).map((k) => [k, job[k] ?? EMPTY[k]])) : EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const cls = (k) => `input ${errors[k] ? "input-error" : ""}`;

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateJob(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      if (editing) await updateJob(job.id, toPayload(form)); else await createJob(toPayload(form));
      toast.success(editing ? "Job updated." : "Job created.");
      router.push("/admin/jobs");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not save the job."));
    } finally { setBusy(false); }
  };

  return (
    <form onSubmit={submit} className="card space-y-5" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Job title" error={errors.title} htmlFor="title"><input id="title" className={cls("title")} value={form.title} onChange={set("title")} /></FormField>
        <FormField label="Company" error={errors.companyName} htmlFor="companyName"><input id="companyName" className={cls("companyName")} value={form.companyName} onChange={set("companyName")} /></FormField>
        <FormField label="Location" error={errors.location} htmlFor="location"><input id="location" className={cls("location")} value={form.location} onChange={set("location")} /></FormField>
        <FormField label="Skills" htmlFor="skills" hint="Comma separated, e.g. Java, Spring Boot, MySQL"><input id="skills" className="input" value={form.skills} onChange={set("skills")} /></FormField>
        <FormField label="Job type" htmlFor="employmentType">
          <select id="employmentType" className="input" value={form.employmentType} onChange={set("employmentType")}>{EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{humanize(t)}</option>)}</select>
        </FormField>
        <FormField label="Work mode" htmlFor="workMode">
          <select id="workMode" className="input" value={form.workMode} onChange={set("workMode")}>{WORK_MODES.map((t) => <option key={t} value={t}>{humanize(t)}</option>)}</select>
        </FormField>
        <FormField label="Minimum experience (years)" htmlFor="experienceMin"><input id="experienceMin" type="number" min="0" className="input" value={form.experienceMin} onChange={set("experienceMin")} /></FormField>
        <FormField label="Maximum experience (years)" error={errors.experienceMax} htmlFor="experienceMax"><input id="experienceMax" type="number" min="0" className={cls("experienceMax")} value={form.experienceMax} onChange={set("experienceMax")} /></FormField>
        <FormField label="Minimum salary" htmlFor="salaryMin"><input id="salaryMin" type="number" min="0" className="input" value={form.salaryMin} onChange={set("salaryMin")} /></FormField>
        <FormField label="Maximum salary" error={errors.salaryMax} htmlFor="salaryMax"><input id="salaryMax" type="number" min="0" className={cls("salaryMax")} value={form.salaryMax} onChange={set("salaryMax")} /></FormField>
        <FormField label="Status" htmlFor="status">
          <select id="status" className="input" value={form.status} onChange={set("status")}>{JOB_STATUSES.map((t) => <option key={t} value={t}>{humanize(t)}</option>)}</select>
        </FormField>
      </div>
      <FormField label="Description" error={errors.description} htmlFor="description">
        <textarea id="description" rows={7} className={cls("description")} value={form.description} onChange={set("description")} />
      </FormField>
      <div className="flex gap-3">
        <button className="btn-primary" disabled={busy}>{busy && <Spinner className="h-4 w-4" />}{editing ? "Save changes" : "Create job"}</button>
        <button type="button" className="btn-secondary" onClick={() => router.push("/admin/jobs")} disabled={busy}>Cancel</button>
      </div>
    </form>
  );
}
