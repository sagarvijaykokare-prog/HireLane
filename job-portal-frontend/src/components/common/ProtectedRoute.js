"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { PageLoader } from "./Spinner";

// <ProtectedRoute>              -> any signed-in user
// <ProtectedRoute role="ADMIN"> -> admins only
// NOTE: this only improves UX. The API Gateway/backend must enforce access.
export default function ProtectedRoute({ role, children }) {
  const { isAuthenticated, isAdmin, loading, expired } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}${expired ? "&expired=1" : ""}`);
    }
  }, [loading, isAuthenticated, expired, pathname, router]);

  if (loading || !isAuthenticated) return <PageLoader label="Checking your session…" />;

  if (role === "ADMIN" && !isAdmin) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <ShieldAlert className="mb-3 h-10 w-10 text-red-500" />
        <h1 className="text-xl font-semibold">Admins only</h1>
        <p className="mt-2 text-sm text-slate-600">Your account does not have access to this area.</p>
        <Link href="/dashboard" className="btn-primary mt-5">Go to my dashboard</Link>
      </div>
    );
  }
  return children;
}
