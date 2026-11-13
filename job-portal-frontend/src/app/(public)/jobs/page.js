import { Suspense } from "react";
import JobBrowser from "@/components/jobs/JobBrowser";
import { PageLoader } from "@/components/common/Spinner";

export const metadata = { title: "Browse jobs – HireLane" };

export default function JobsPage() {
  return (
    <div className="container-page py-10">
      <h1 className="mb-6 text-3xl font-bold">Browse jobs</h1>
      <Suspense fallback={<PageLoader />}><JobBrowser basePath="/jobs" /></Suspense>
    </div>
  );
}
