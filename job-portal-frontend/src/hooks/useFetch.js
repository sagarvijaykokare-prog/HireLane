"use client";
import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "@/services/api";

// Runs an async function on mount and exposes { data, loading, error, reload }.
export default function useFetch(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const run = useCallback(async () => {
    setLoading(true); setError("");
    try { setData(await fn()); }
    catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { run(); }, [run]);
  return { data, loading, error, reload: run, setData };
}
