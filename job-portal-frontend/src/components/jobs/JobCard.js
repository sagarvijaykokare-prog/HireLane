import Link from "next/link";
import { Building2, Clock, MapPin, Wallet } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { formatSalary, humanize, skillList } from "@/utils/format";

export default function JobCard({ job, href }) {
  const skills = skillList(job.skills).slice(0, 3);
  return (
    <article className="card flex flex-col transition hover:border-brand-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold"><Link href={href} className="hover:text-brand-700">{job.title}</Link></h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600"><Building2 className="h-4 w-4 shrink-0" /><span className="truncate">{job.companyName}</span></p>
        </div>
        {job.status && <StatusBadge status={job.status} />}
      </div>
      <ul className="mt-3 space-y-1.5 text-sm text-slate-500">
        <li className="flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}{job.workMode ? ` · ${humanize(job.workMode)}` : ""}</li>
        <li className="flex items-center gap-1.5"><Clock className="h-4 w-4" />{humanize(job.employmentType)}</li>
        <li className="flex items-center gap-1.5"><Wallet className="h-4 w-4" />{formatSalary(job.salaryMin, job.salaryMax)}</li>
      </ul>
      {skills.length > 0 && <div className="mt-3 flex flex-wrap gap-1.5">{skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>}
      <Link href={href} className="btn-secondary btn-sm mt-4 self-start">View details</Link>
    </article>
  );
}
