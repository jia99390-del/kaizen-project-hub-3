import { prisma } from "@/lib/db";
export const runtime = "nodejs";
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const img = await prisma.image.findUnique({ where: { id: params.id } });
  if (!img) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(img.data), { headers: { "Content-Type": img.mime, "Cache-Control": "public, max-age=31536000, immutable" } });
}
