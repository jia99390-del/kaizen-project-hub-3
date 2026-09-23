"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
  const r = useRouter(); const [err, setErr] = useState("");
  async function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch("/api/login", { method: "POST", body: JSON.stringify({ password: new FormData(e.currentTarget).get("password") }) });
    res.ok ? r.push("/admin") : setErr((await res.json()).error);
  }
  return (
    <form onSubmit={go} className="mx-auto mt-24 max-w-sm space-y-4">
      <h1 className="font-display text-3xl font-semibold">Admin sign in</h1>
      <input name="password" type="password" required autoFocus placeholder="Password" className="w-full rounded-lg border border-line bg-card px-3 py-2 outline-none focus:border-blue" />
      <button className="w-full rounded-lg bg-blue py-2 font-medium text-paper">Sign in</button>
      <p role="alert" className="text-sm text-red-500">{err}</p>
    </form>
  );
}
