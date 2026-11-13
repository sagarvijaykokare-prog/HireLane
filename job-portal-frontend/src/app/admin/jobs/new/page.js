"use client";
import PageHeader from "@/components/dashboard/PageHeader";
import JobForm from "@/components/jobs/JobForm";

export default function NewJobPage() {
  return (<><PageHeader title="Create job" subtitle="Publish a new job listing." /><JobForm /></>);
}
