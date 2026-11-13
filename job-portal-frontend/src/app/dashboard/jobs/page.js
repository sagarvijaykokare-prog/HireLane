import { Suspense } from "react";
import JobBrowser from "@/components/jobs/JobBrowser";
import PageHeader from "@/components/dashboard/PageHeader";
import { PageLoader } from "@/components/common/Spinner";

export default function DashboardJobsPage() {
  return (
    <>
      <PageHeader title="Browse jobs" subtitle="Search and filter open roles." />
      <Suspense fallback={<PageLoader />}><JobBrowser basePath="/dashboard/jobs" /></Suspense>
    </>
  );
}
