import { NextResponse } from "next/server";
import { COOKIE, makeToken } from "@/lib/auth";
export async function POST(req: Request) {
  const { password } = await req.json();
  if (!process.env.ADMIN_PASSWORD || !process.env.AUTH_SECRET || password !== process.env.ADMIN_PASSWORD) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, await makeToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 7 * 86400 });
  return res;
}
