import Link from "next/link";
import { Project, costRange } from "@/lib/types";
export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-blue hover:shadow-xl">
      <div className="aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between text-xs text-mute"><span>{p.category}</span><span className="rounded-full border border-line px-2 py-0.5">{p.difficulty}</span></div>
        <h3 className="font-display text-xl font-semibold">{p.title}</h3>
        <p className="line-clamp-2 text-sm text-mute">{p.description}</p>
        <p className="pt-1 text-sm font-semibold text-blue">{costRange(p)}</p>
      </div>
    </Link>
  );
}
