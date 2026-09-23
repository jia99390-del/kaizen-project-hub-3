import { notFound } from "next/navigation";
import AdminForm from "@/components/AdminForm";
import { getProject } from "@/lib/projects";
export const dynamic = "force-dynamic";
export default async function Edit({ params }: { params: { slug: string } }) {
  const p = await getProject(params.slug); if (!p) notFound();
  return <div className="pt-10"><h1 className="mb-8 font-display text-4xl font-semibold">Edit: {p.title}</h1><AdminForm initial={p} /></div>;
}
