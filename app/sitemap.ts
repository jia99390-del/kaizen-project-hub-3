import { getProjects } from "@/lib/projects";
export const dynamic = "force-dynamic";
export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  return [{ url: base }, ...(await getProjects()).map((p) => ({ url: `${base}/projects/${p.slug}`, lastModified: p.createdAt }))];
}
