import { NextResponse } from "next/server";
import { getProject, saveProject } from "@/lib/projects";
import type { Project } from "@/lib/types";
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export async function POST(req: Request) {
  const p = (await req.json()) as Project;
  if (!p.title || !p.image || !p.versions?.length) return NextResponse.json({ error: "Title, image and at least one version are required." }, { status: 400 });
  let slug = slugify(p.title);
  if (await getProject(slug)) slug += "-" + Date.now().toString(36);
  await saveProject({ ...p, slug });
  return NextResponse.json({ slug });
}
