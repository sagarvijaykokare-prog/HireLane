"use client";
import { useParams } from "next/navigation";
import JobDetails from "@/components/jobs/JobDetails";

export default function PublicJobDetailPage() {
  const { id } = useParams();
  return <div className="container-page py-10"><JobDetails id={id} mode="public" backHref="/jobs" /></div>;
}
