import Link from "next/link";

export const metadata = { title: "About – HireLane" };

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-14">
      <h1 className="text-3xl font-bold">About HireLane</h1>
      <p className="mt-4 text-slate-700">HireLane connects job seekers with open roles and gives hiring teams one place to post jobs and review applications.</p>
      <h2 className="mt-8 text-xl font-semibold">For job seekers</h2>
      <p className="mt-2 text-slate-700">Search by title, skill or location, apply with a cover letter and resume link, and follow each application’s status from your dashboard.</p>
      <h2 className="mt-8 text-xl font-semibold">For hiring teams</h2>
      <p className="mt-2 text-slate-700">Admins create and edit job listings, review every application and update its status as candidates move through the process.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/jobs" className="btn-primary">Browse jobs</Link>
        <Link href="/register" className="btn-secondary">Create account</Link>
      </div>
    </div>
  );
}
