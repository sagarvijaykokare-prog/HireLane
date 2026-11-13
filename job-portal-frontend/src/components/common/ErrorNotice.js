import { AlertTriangle } from "lucide-react";

export default function ErrorNotice({ message, onRetry }) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center" role="alert">
      <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
      <p className="flex-1 text-sm text-red-800">{message}</p>
      {onRetry && <button onClick={onRetry} className="btn-secondary btn-sm">Try again</button>}
    </div>
  );
}
