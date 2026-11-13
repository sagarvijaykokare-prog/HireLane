"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";

const LINKS = [{ href: "/", label: "Home" }, { href: "/jobs", label: "Browse jobs" }, { href: "/about", label: "About" }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isAdmin, loading, logout } = useAuth();
  const dash = isAdmin ? "/admin" : "/dashboard";

  const linkCls = (href) => `rounded-md px-3 py-2 text-sm font-medium ${pathname === href ? "text-brand-700" : "text-slate-600 hover:text-slate-900"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => <Link key={l.href} href={l.href} className={linkCls(l.href)}>{l.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {!loading && (isAuthenticated ? (
            <>
              <Link href={dash} className="btn-secondary btn-sm">{isAdmin ? "Admin panel" : "My dashboard"}</Link>
              <button onClick={logout} className="btn-ghost btn-sm">Log out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost btn-sm">Log in</Link>
              <Link href="/register" className="btn-primary btn-sm">Create account</Link>
            </>
          ))}
        </div>
        <button className="rounded-md p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col py-2" onClick={() => setOpen(false)}>
            {LINKS.map((l) => <Link key={l.href} href={l.href} className={linkCls(l.href)}>{l.label}</Link>)}
          </div>
          <div className="flex gap-2" onClick={() => setOpen(false)}>
            {isAuthenticated ? (
              <>
                <Link href={dash} className="btn-secondary flex-1">Dashboard</Link>
                <button onClick={logout} className="btn-ghost flex-1">Log out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-secondary flex-1">Log in</Link>
                <Link href="/register" className="btn-primary flex-1">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
