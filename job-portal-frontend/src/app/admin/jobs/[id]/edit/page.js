"use client";
import { useParams } from "next/navigation";
import { getJobById } from "@/services/jobService";
import useFetch from "@/hooks/useFetch";
import PageHeader from "@/components/dashboard/PageHeader";
import JobForm from "@/components/jobs/JobForm";
import ErrorNotice from "@/components/common/ErrorNotice";
import { PageLoader } from "@/components/common/Spinner";

export default function EditJobPage() {
  const { id } = useParams();
  const { data: job, loading, error, reload } = useFetch(() => getJobById(id), [id]);
  if (loading) return <PageLoader />;
  if (error) return <ErrorNotice message={error} onRetry={reload} />;
  return (<><PageHeader title="Edit job" subtitle={job.title} /><JobForm job={job} /></>);
}
