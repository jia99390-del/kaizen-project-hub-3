import { NextResponse } from "next/server";
import { deleteProject, saveProject } from "@/lib/projects";
import type { Project } from "@/lib/types";
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const p = (await req.json()) as Project;
  if (!p.title || !p.image || !p.versions?.length) return NextResponse.json({ error: "Title, image and at least one version are required." }, { status: 400 });
  await saveProject({ ...p, slug: params.slug }, params.slug);
  return NextResponse.json({ slug: params.slug });
}
export async function DELETE(_: Request, { params }: { params: { slug: string } }) { await deleteProject(params.slug); return NextResponse.json({ ok: true }); }
