"use client";
import { LayoutDashboard, Briefcase, PlusCircle, FileText } from "lucide-react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import DashboardShell from "@/components/layout/DashboardShell";

const LINKS = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/jobs", label: "All jobs", icon: Briefcase, exact: true },
  { href: "/admin/jobs/new", label: "Create job", icon: PlusCircle },
  { href: "/admin/applications", label: "Applications", icon: FileText },
];

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute role="ADMIN">
      <DashboardShell links={LINKS} title="Admin">{children}</DashboardShell>
    </ProtectedRoute>
  );
}
