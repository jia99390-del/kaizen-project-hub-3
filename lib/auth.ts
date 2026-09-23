import { cookies } from "next/headers";
export const COOKIE = "kaizen_admin";
const enc = new TextEncoder();
async function sign(v: string) {
  const k = await crypto.subtle.importKey("raw", enc.encode(process.env.AUTH_SECRET ?? ""), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return Array.from(new Uint8Array(await crypto.subtle.sign("HMAC", k, enc.encode(v)))).map((b) => b.toString(16).padStart(2, "0")).join("");
}
export async function makeToken() { const exp = Date.now() + 7 * 864e5; return `${exp}.${await sign(String(exp))}`; }
export async function verifyToken(t?: string) {
  if (!t || !process.env.AUTH_SECRET) return false;
  const [exp, sig] = t.split(".");
  return Number(exp) > Date.now() && sig === (await sign(exp));
}
export const isAdmin = async () => verifyToken(cookies().get(COOKIE)?.value);
