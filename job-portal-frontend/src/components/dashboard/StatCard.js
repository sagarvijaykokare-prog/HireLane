export default function StatCard({ label, value, icon: Icon, tone = "brand" }) {
  const tones = { brand: "bg-brand-50 text-brand-700", amber: "bg-amber-50 text-amber-700", blue: "bg-blue-50 text-blue-700", green: "bg-green-50 text-green-700" };
  return (
    <div className="card flex items-center gap-4">
      <div className={`rounded-lg p-3 ${tones[tone]}`}><Icon className="h-5 w-5" /></div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
}
