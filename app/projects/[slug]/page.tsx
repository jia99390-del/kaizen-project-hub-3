import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";
import { projectTotal, startingCost, money } from "@/lib/types";
import VersionCompare from "@/components/VersionCompare";
export const dynamic = "force-dynamic";
type Props = { params: { slug: string } };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProject(params.slug);
  if (!p) return {};
  return { title: p.title, description: p.description, openGraph: { title: p.title, description: p.description, images: [p.image] } };
}
const Block = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-xl border border-line bg-card p-5"><h3 className="font-display text-xl font-semibold">{title}</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mute">{items.map((t) => <li key={t}>{t}</li>)}</ul></div>
);
export default async function ProjectPage({ params }: Props) {
  const p = await getProject(params.slug);
  if (!p) notFound();
  const related = (await getProjects()).filter((x) => x.slug !== p.slug).sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category)).slice(0, 3);
  const std = p.versions.find((v) => v.tier === "standard") ?? p.versions[0];
  const ld = { "@context": "https://schema.org", "@type": "HowTo", name: p.title, description: p.description, image: p.image,
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: startingCost(p) },
    step: std.steps.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.text })) };
  return (
    <article className="pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="rise grid gap-8 lg:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.title} className="w-full rounded-xl border border-line object-cover" />
        <div>
          <p className="text-sm text-mute">{p.category}</p>
          <h1 className="mt-1 font-display text-4xl font-semibold sm:text-5xl">{p.title}</h1>
          <p className="mt-4 text-mute">{p.description}</p>
          <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
            {[["Difficulty", p.difficulty], ["Time", p.time], ["From", money(startingCost(p))]].map(([k, v]) => <div key={k} className="rounded-lg border border-line bg-card p-3"><dt className="text-mute">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>)}
          </dl>
          <p className="mt-3 text-sm text-mute">Full range: {money(startingCost(p))} to {money(Math.max(...p.versions.map(projectTotal)))} depending on version.</p>
        </div>
      </div>
      <VersionCompare versions={p.versions} />
      {p.gallery && p.gallery.length > 0 && <section className="mt-14" aria-labelledby="gal"><h2 id="gal" className="font-display text-3xl font-semibold">Reference photos</h2><div className="mt-5 grid gap-5 md:grid-cols-2">{p.gallery.map((g) => <img key={g} src={g} alt={`${p.title} reference`} loading="lazy" className="w-full rounded-xl border border-line" />)}</div></section>}
      <section className="mt-14" aria-labelledby="home"><h2 id="home" className="font-display text-3xl font-semibold">Home build guide</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Block title="Tools needed" items={p.tools} /><Block title="Safety precautions" items={p.safety} />
          <Block title="Common mistakes to avoid" items={p.mistakes} /><Block title="Alternative materials" items={p.alternatives} />
          <Block title="Beginner tips" items={p.tips} />
        </div></section>
      {related.length > 0 && <section className="mt-14" aria-labelledby="rel"><h2 id="rel" className="font-display text-3xl font-semibold">Related projects</h2><div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <ProjectCard key={r.slug} p={r} />)}</div></section>}
    </article>
  );
}
