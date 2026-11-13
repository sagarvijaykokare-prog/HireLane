import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function Logo({ light = false, href = "/" }) {
  return (
    <Link href={href} className={`flex items-center gap-2 text-lg font-bold ${light ? "text-white" : "text-slate-900"}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white"><Briefcase className="h-4 w-4" /></span>
      HireLane
    </Link>
  );
}
