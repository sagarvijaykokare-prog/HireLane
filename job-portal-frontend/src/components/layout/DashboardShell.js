"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

export default function DashboardShell({ links, title, children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const isActive = (l) => (l.exact ? pathname === l.href : pathname === l.href || pathname.startsWith(l.href + "/"));
  const handleLogout = () => { logout(); router.push("/login"); };

  const nav = (
    <nav className="flex flex-col gap-1 p-3" aria-label={title}>
      {links.map((l) => {
        const Icon = l.icon;
        return (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive(l) ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100"}`}>
            <Icon className="h-4 w-4" />{l.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center border-b border-slate-200 px-5"><Logo /></div>
        {nav}
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5"><Logo /><button onClick={() => setOpen(false)} aria-label="Close menu"><X className="h-5 w-5" /></button></div>
            {nav}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button className="rounded-md p-2 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
            <span className="text-sm font-semibold text-slate-700">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[200px] truncate text-sm text-slate-500 sm:block">{user?.email}</span>
            <button onClick={handleLogout} className="btn-secondary btn-sm"><LogOut className="h-4 w-4" />Log out</button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-6xl">{children}</div></main>
      </div>
    </div>
  );
}
