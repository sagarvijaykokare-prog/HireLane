"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, MapPin, UserPlus, FileText, Send, BellRing, ShieldCheck, Zap, LineChart, ArrowRight } from "lucide-react";
import { getJobs } from "@/services/jobService";
import { CATEGORIES } from "@/config/constants";
import JobCard from "@/components/jobs/JobCard";
import { PageLoader } from "@/components/common/Spinner";

const WHY = [
  { icon: Zap, title: "Apply in one form", text: "Write a cover letter, attach your resume link, and send. No repeated data entry." },
  { icon: LineChart, title: "See where you stand", text: "Every application shows a clear status, from pending to accepted or rejected." },
  { icon: ShieldCheck, title: "Your data stays yours", text: "Only you can manage your profile, and sign-in uses secure tokens." },
];
const STEPS = [
  { icon: UserPlus, title: "Create an account", text: "Register with your email in under a minute." },
  { icon: FileText, title: "Build your profile", text: "Add skills, experience and a resume link." },
  { icon: Send, title: "Apply to jobs", text: "Search, open a role and submit your application." },
  { icon: BellRing, title: "Follow your status", text: "Check your applications page for updates." },
];

export default function HomePage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => { getJobs().then((j) => setJobs(j.slice(0, 6))).catch(() => { setFailed(true); setJobs([]); }); }, []);

  const search = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (location.trim()) p.set("location", location.trim());
    router.push(`/jobs${p.toString() ? "?" + p : ""}`);
  };

  return (
    <>
      <section className="bg-brand-900 text-white">
        <div className="container-page py-16 sm:py-24">
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">Find the job that fits the life you want.</h1>
          <p className="mt-4 max-w-xl text-lg text-brand-100">Search open roles, apply in minutes and keep every application in one place.</p>
          <form onSubmit={search} className="mt-8 grid max-w-3xl gap-2 rounded-xl bg-white p-2 shadow-lg sm:grid-cols-[1fr_1fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input value={q} onChange={(e) => setQ(e.target.value)} className="w-full rounded-lg px-9 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-200" placeholder="Job title or skill" aria-label="Job title" />
            </div>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded-lg px-9 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-200" placeholder="City or country" aria-label="Location" />
            </div>
            <button className="btn-primary px-6 py-3">Search jobs</button>
          </form>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Latest jobs</h2>
          <Link href="/jobs" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">View all jobs<ArrowRight className="h-4 w-4" /></Link>
        </div>
        {jobs === null ? <PageLoader label="Loading jobs…" /> : jobs.length === 0 ? (
          <p className="card text-sm text-slate-500">{failed ? "Jobs could not be loaded right now. Make sure the API Gateway is running." : "No jobs are posted yet. Check back soon."}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{jobs.map((j) => <JobCard key={j.id} job={j} href={`/jobs/${j.id}`} />)}</div>
        )}
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="container-page">
          <h2 className="mb-6 text-2xl font-bold">Browse by category</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link key={c.name} href={`/jobs?q=${encodeURIComponent(c.query)}`} className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium hover:border-brand-500 hover:bg-brand-50">{c.name}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <h2 className="mb-6 text-2xl font-bold">Why people use HireLane</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {WHY.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card"><Icon className="h-6 w-6 text-brand-600" /><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-1 text-sm text-slate-600">{text}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-page">
          <h2 className="mb-6 text-2xl font-bold">How it works</h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-700"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-3 font-semibold">{i + 1}. {title}</h3>
                <p className="mt-1 text-sm text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="rounded-2xl bg-brand-700 px-6 py-10 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to apply?</h2>
          <p className="mx-auto mt-2 max-w-md text-brand-100">Create a free account and send your first application today.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className="btn bg-white text-brand-800 hover:bg-brand-50">Create account</Link>
            <Link href="/jobs" className="btn border border-white/40 text-white hover:bg-white/10">Browse jobs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
