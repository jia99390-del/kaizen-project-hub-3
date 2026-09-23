"use client";
import { useRouter } from "next/navigation";
export function DeleteButton({ slug, title }: { slug: string; title: string }) {
  const r = useRouter();
  return <button className="text-red-500 hover:underline" onClick={async () => { if (confirm(`Delete “${title}” and all its versions?`)) { await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" }); r.refresh(); } }}>Delete</button>;
}
export function LogoutButton() {
  const r = useRouter();
  return <button className="text-mute hover:text-ink" onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); r.push("/admin/login"); }}>Sign out</button>;
}
