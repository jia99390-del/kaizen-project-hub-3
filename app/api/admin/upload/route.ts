import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
export const runtime = "nodejs";
export async function POST(req: Request) {
  const file = (await req.formData()).get("file") as File | null;
  if (!file || !/^image\/(png|jpe?g|webp|gif)$/.test(file.type)) return NextResponse.json({ error: "Upload a PNG, JPG, WebP or GIF image." }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: "Image must be under 4 MB." }, { status: 400 });
  const img = await prisma.image.create({ data: { mime: file.type, data: Buffer.from(await file.arrayBuffer()) } });
  return NextResponse.json({ url: `/img/${img.id}` });
}
