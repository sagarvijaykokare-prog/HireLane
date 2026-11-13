"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getErrorMessage } from "@/services/api";
import { validateLogin } from "@/utils/validators";
import FormField from "@/components/common/FormField";
import { Spinner } from "@/components/common/Spinner";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isAdmin, loading, expired } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  // Already signed in -> go to the right dashboard
  useEffect(() => { if (!loading && isAuthenticated) router.replace(isAdmin ? "/admin" : "/dashboard"); }, [loading, isAuthenticated, isAdmin, router]);

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateLogin(form);
    setErrors(errs); setFormError("");
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      const user = await login({ email: form.email.trim(), password: form.password });
      const next = new URLSearchParams(window.location.search).get("next");
      // Only follow same-site paths, and keep admins/users inside their own area
      const safe = next && next.startsWith("/") && !next.startsWith("//") ? next : null;
      if (user.isAdmin) router.replace(safe && safe.startsWith("/admin") ? safe : "/admin");
      else router.replace(safe && !safe.startsWith("/admin") ? safe : "/dashboard");
    } catch (err) {
      const status = err?.response?.status;
      setFormError(status === 401 || status === 403 ? "Incorrect email or password." : getErrorMessage(err, "Login failed. Please try again."));
    } finally { setBusy(false); }
  };

  return (
    <div className="container-page flex justify-center py-14">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-500">Log in to apply for jobs and track your applications.</p>
        {expired && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800" role="alert">Your session expired. Please log in again.</p>}
        <form onSubmit={submit} className="card mt-6 space-y-4" noValidate>
          {formError && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{formError}</p>}
          <FormField label="Email" error={errors.email} htmlFor="email">
            <input id="email" type="email" autoComplete="email" className={`input ${errors.email ? "input-error" : ""}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </FormField>
          <FormField label="Password" error={errors.password} htmlFor="password">
            <input id="password" type="password" autoComplete="current-password" className={`input ${errors.password ? "input-error" : ""}`} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </FormField>
          <button className="btn-primary w-full" disabled={busy}>{busy && <Spinner className="h-4 w-4" />}Log in</button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600">New here? <Link href="/register" className="font-semibold text-brand-700 hover:underline">Create an account</Link></p>
      </div>
    </div>
  );
}
