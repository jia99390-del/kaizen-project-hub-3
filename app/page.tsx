import { getProjects } from "@/lib/projects";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectCard from "@/components/ProjectCard";
export const dynamic = "force-dynamic";
export default async function Home() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  return (
    <>
      <section className="rise py-14">
        <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-6xl">The encyclopedia of things you can build.</h1>
        <p className="mt-4 max-w-xl text-lg text-mute">Every project comes in budget, standard and premium versions with material lists, real costs and clear steps.</p>
      </section>
      {featured.length > 0 && <section className="mb-14" aria-labelledby="feat"><h2 id="feat" className="mb-5 font-display text-3xl font-semibold">Featured projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((p) => <ProjectCard key={p.slug} p={p} />)}</div></section>}
      <section aria-labelledby="all"><h2 id="all" className="mb-5 font-display text-3xl font-semibold">All projects</h2><ProjectGrid projects={projects} /></section>
    </>
  );
}
