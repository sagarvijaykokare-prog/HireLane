import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm text-brand-200">Search openings, apply with one form, and follow every application from submitted to decided.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">For job seekers</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/jobs" className="hover:text-white">Browse jobs</Link></li>
            <li><Link href="/register" className="hover:text-white">Create an account</Link></li>
            <li><Link href="/dashboard/applications" className="hover:text-white">Track applications</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About us</Link></li>
            <li><Link href="/login" className="hover:text-white">Log in</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-800 py-4 text-center text-xs text-brand-200">© {new Date().getFullYear()} HireLane. All rights reserved.</div>
    </footer>
  );
}
