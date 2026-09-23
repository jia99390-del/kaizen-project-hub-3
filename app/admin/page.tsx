import Link from "next/link";
import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { DeleteButton, LogoutButton } from "@/components/AdminActions";
import { costRange } from "@/lib/types";
export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const projects = await getProjects();
  return (
    <div className="pt-10">
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="font-display text-4xl font-semibold">Admin dashboard</h1>
        <div className="flex items-center gap-4 text-sm"><LogoutButton /><Link href="/admin/new" className="rounded-lg bg-blue px-4 py-2 font-medium text-paper">New project</Link></div></div>
      <div className="mt-8 divide-y divide-line rounded-xl border border-line">
        {projects.length === 0 && <p className="p-6 text-mute">No projects yet. Create your first one.</p>}
        {projects.map((p) => (
          <div key={p.slug} className="flex flex-wrap items-center gap-4 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt="" className="h-14 w-20 rounded object-cover" />
            <div className="min-w-0 flex-1"><p className="font-medium">{p.title}</p><p className="text-sm text-mute">{p.category} · {costRange(p)} · {p.versions.length} versions</p></div>
            <div className="flex gap-4 text-sm"><Link href={`/projects/${p.slug}`} className="text-mute hover:text-ink">View</Link><Link href={`/admin/${p.slug}/edit`} className="text-blue hover:underline">Edit</Link><DeleteButton slug={p.slug} title={p.title} /></div>
          </div>))}
      </div>
    </div>
  );
}
