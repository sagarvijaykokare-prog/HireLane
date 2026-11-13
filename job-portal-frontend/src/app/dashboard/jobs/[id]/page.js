"use client";
import { useParams } from "next/navigation";
import JobDetails from "@/components/jobs/JobDetails";

export default function DashboardJobDetailPage() {
  const { id } = useParams();
  return <JobDetails id={id} mode="user" backHref="/dashboard/jobs" />;
}
