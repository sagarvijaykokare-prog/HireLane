"use client";
import { LayoutDashboard, Search, FileText, UserCircle } from "lucide-react";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import DashboardShell from "@/components/layout/DashboardShell";

const LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/jobs", label: "Browse jobs", icon: Search },
  { href: "/dashboard/applications", label: "My applications", icon: FileText },
  { href: "/dashboard/profile", label: "My profile", icon: UserCircle },
];

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <DashboardShell links={LINKS} title="Job seeker">{children}</DashboardShell>
    </ProtectedRoute>
  );
}
