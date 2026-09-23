import type { Prisma } from "@prisma/client";
import { prisma } from "./db";
import type { Project, Version, Tier, Difficulty } from "./types";
const include = { versions: { orderBy: { position: "asc" }, include: { materials: { orderBy: { position: "asc" } }, steps: { orderBy: { position: "asc" } } } } } satisfies Prisma.ProjectInclude;
type Row = Prisma.ProjectGetPayload<{ include: typeof include }>;
const map = (r: Row): Project => ({
  slug: r.slug, title: r.title, description: r.description, category: r.category, image: r.image, gallery: r.gallery, featured: r.featured,
  difficulty: r.difficulty as Difficulty, time: r.time, tools: r.tools, safety: r.safety, mistakes: r.mistakes, alternatives: r.alternatives, tips: r.tips,
  createdAt: r.createdAt.toISOString(),
  versions: r.versions.map((v) => ({ tier: v.tier as Tier, extraCost: v.extraCost, pros: v.pros, cons: v.cons, durability: v.durability, difficulty: v.difficulty as Difficulty, time: v.time,
    materials: v.materials.map((m) => ({ name: m.name, qty: m.qty, purpose: m.purpose, cost: m.cost })),
    steps: v.steps.map((s) => ({ title: s.title, text: s.text, image: s.imageUrl ?? undefined, safety: s.safety ?? undefined, tip: s.tip ?? undefined })) })),
});
export const getProjects = async () => (await prisma.project.findMany({ include, orderBy: { createdAt: "desc" } })).map(map);
export const getProject = async (slug: string) => { const r = await prisma.project.findUnique({ where: { slug }, include }); return r ? map(r) : undefined; };
export const deleteProject = (slug: string) => prisma.project.delete({ where: { slug } });
const vCreate = (vs: Version[]) => vs.map((v, i) => ({ tier: v.tier, extraCost: v.extraCost, durability: v.durability, difficulty: v.difficulty, time: v.time, pros: v.pros, cons: v.cons, position: i,
  materials: { create: v.materials.map((m, j) => ({ ...m, position: j })) },
  steps: { create: v.steps.map((s, j) => ({ title: s.title, text: s.text, imageUrl: s.image ?? null, safety: s.safety ?? null, tip: s.tip ?? null, position: j })) } }));
/** Create a project, or replace all of `editSlug`'s content when editing. */
export async function saveProject(p: Project, editSlug?: string) {
  const base = { slug: p.slug, title: p.title, description: p.description, category: p.category, difficulty: p.difficulty, time: p.time, image: p.image, gallery: p.gallery ?? [], featured: !!p.featured,
    tools: p.tools, safety: p.safety, mistakes: p.mistakes, alternatives: p.alternatives, tips: p.tips };
  const ex = editSlug ? await prisma.project.findUnique({ where: { slug: editSlug } }) : null;
  if (ex) await prisma.$transaction([prisma.version.deleteMany({ where: { projectId: ex.id } }), prisma.project.update({ where: { id: ex.id }, data: { ...base, versions: { create: vCreate(p.versions) } } })]);
  else await prisma.project.upsert({ where: { slug: p.slug }, update: { ...base, versions: { deleteMany: {}, create: vCreate(p.versions) } }, create: { ...base, versions: { create: vCreate(p.versions) } } });
}
