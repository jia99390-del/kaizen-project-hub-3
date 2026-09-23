"use client";
import { useMemo, useState } from "react";
import { Project } from "@/lib/types";
import ProjectCard from "./ProjectCard";
export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("All");
  const cats = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const list = useMemo(() => { const s = q.trim().toLowerCase();
    return projects.filter((p) => (cat === "All" || p.category === cat) && (!s || `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(s))); }, [q, cat, projects]);
  return (
    <>
      <input value={q} onChange={(e) => setQ(e.target.value)} type="search" placeholder="Search projects, e.g. shelf, planter, desk" aria-label="Search projects" className="w-full rounded-xl border border-line bg-card px-4 py-3 outline-none focus:border-blue" />
      <div className="my-5 flex flex-wrap gap-2" role="group" aria-label="Categories">
        {cats.map((c) => <button key={c} aria-pressed={c === cat} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm transition ${c === cat ? "border-blue bg-blue text-paper" : "border-line text-mute hover:border-blue"}`}>{c}</button>)}
      </div>
      {list.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
        : <p className="text-mute">No projects match. Try a different word or choose All.</p>}
    </>
  );
}
