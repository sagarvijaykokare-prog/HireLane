"use client";
import { useState } from "react";
import FormField from "@/components/common/FormField";
import { Spinner } from "@/components/common/Spinner";
import { validateProfile } from "@/utils/validators";

const EMPTY = { fullName: "", phone: "", location: "", bio: "", skills: "", experienceYears: "", resumeUrl: "" };

export default function ProfileForm({ initial, submitLabel, busy, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial ? Object.fromEntries(Object.keys(EMPTY).map((k) => [k, initial[k] ?? ""])) : EMPTY);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const cls = (k) => `input ${errors[k] ? "input-error" : ""}`;

  const submit = (e) => {
    e.preventDefault();
    const errs = validateProfile(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ ...form, fullName: form.fullName.trim(), phone: form.phone.trim(), location: form.location.trim(), bio: form.bio.trim(),
      skills: form.skills.trim(), experienceYears: Number(form.experienceYears), resumeUrl: form.resumeUrl.trim() });
  };

  return (
    <form onSubmit={submit} className="card space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name" error={errors.fullName} htmlFor="fullName"><input id="fullName" className={cls("fullName")} value={form.fullName} onChange={set("fullName")} /></FormField>
        <FormField label="Phone" error={errors.phone} htmlFor="phone"><input id="phone" className={cls("phone")} value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" /></FormField>
        <FormField label="Location" error={errors.location} htmlFor="location"><input id="location" className={cls("location")} value={form.location} onChange={set("location")} /></FormField>
        <FormField label="Experience (years)" error={errors.experienceYears} htmlFor="experienceYears"><input id="experienceYears" type="number" min="0" className={cls("experienceYears")} value={form.experienceYears} onChange={set("experienceYears")} /></FormField>
      </div>
      <FormField label="Skills" htmlFor="skills" hint="Comma separated, e.g. React, Java, SQL"><input id="skills" className="input" value={form.skills} onChange={set("skills")} /></FormField>
      <FormField label="Resume URL" error={errors.resumeUrl} htmlFor="resumeUrl"><input id="resumeUrl" className={cls("resumeUrl")} value={form.resumeUrl} onChange={set("resumeUrl")} placeholder="https://" /></FormField>
      <FormField label="Bio" htmlFor="bio"><textarea id="bio" rows={4} className="input" value={form.bio} onChange={set("bio")} /></FormField>
      <div className="flex gap-3">
        <button className="btn-primary" disabled={busy}>{busy && <Spinner className="h-4 w-4" />}{submitLabel}</button>
        {onCancel && <button type="button" className="btn-secondary" onClick={onCancel} disabled={busy}>Cancel</button>}
      </div>
    </form>
  );
}
