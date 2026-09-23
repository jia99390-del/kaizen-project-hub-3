import { NextRequest, NextResponse } from "next/server";
import { COOKIE, verifyToken } from "./lib/auth";
// Every /admin page and /api/admin route requires a valid signed admin cookie. Visitors get redirected or a 401.
export async function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  if (p === "/admin/login" || (await verifyToken(req.cookies.get(COOKIE)?.value))) return NextResponse.next();
  return p.startsWith("/api/") ? NextResponse.json({ error: "Unauthorized" }, { status: 401 }) : NextResponse.redirect(new URL("/admin/login", req.url));
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
