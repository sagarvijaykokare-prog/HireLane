"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/common/Toast";
import { getErrorMessage } from "@/services/api";
import { validateRegister } from "@/utils/validators";
import FormField from "@/components/common/FormField";
import { Spinner } from "@/components/common/Spinner";

export default function RegisterPage() {
  const router = useRouter();
  const toast = useToast();
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateRegister(form);
    setErrors(errs); setFormError("");
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      const msg = await register({ email: form.email.trim(), password: form.password });
      toast.success(msg + " You can log in now.");
      router.push("/login");
    } catch (err) {
      setFormError(getErrorMessage(err, "Registration failed. Please try again."));
    } finally { setBusy(false); }
  };

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div className="container-page flex justify-center py-14">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-slate-500">It takes less than a minute.</p>
        <form onSubmit={submit} className="card mt-6 space-y-4" noValidate>
          {formError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{formError}</p>}
          <FormField label="Email" error={errors.email} htmlFor="email"><input id="email" type="email" autoComplete="email" className={`input ${errors.email ? "input-error" : ""}`} value={form.email} onChange={f("email")} /></FormField>
          <FormField label="Password" error={errors.password} htmlFor="password" hint="At least 4 characters"><input id="password" type="password" autoComplete="new-password" className={`input ${errors.password ? "input-error" : ""}`} value={form.password} onChange={f("password")} /></FormField>
          <FormField label="Confirm password" error={errors.confirm} htmlFor="confirm"><input id="confirm" type="password" autoComplete="new-password" className={`input ${errors.confirm ? "input-error" : ""}`} value={form.confirm} onChange={f("confirm")} /></FormField>
          <button className="btn-primary w-full" disabled={busy}>{busy && <Spinner className="h-4 w-4" />}Create account</button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">Already registered? <Link href="/login" className="font-semibold text-brand-700 hover:underline">Log in</Link></p>
      </div>
    </div>
  );
}
