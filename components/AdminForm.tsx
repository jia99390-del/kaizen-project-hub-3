"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project, Version, Tier, Difficulty } from "@/lib/types";
const tiers: Tier[] = ["budget", "standard", "premium"];
const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const parts = (l: string) => l.split("|").map((x) => x.trim());
const list = (a?: string[]) => (a ?? []).join("\n");
const inp = "w-full rounded-lg border border-line bg-card px-3 py-2 outline-none focus:border-blue";
const upload = async (file: File) => { const f = new FormData(); f.set("file", file); const r = await fetch("/api/admin/upload", { method: "POST", body: f }); const j = await r.json(); if (!r.ok) throw new Error(j.error); return j.url as string; };
export default function AdminForm({ initial }: { initial?: Project }) {
  const r = useRouter(); const [status, setStatus] = useState(""); const [lib, setLib] = useState("");
  const V = (t: Tier) => initial?.versions.find((v) => v.tier === t);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget); const g = (k: string) => String(f.get(k) ?? "");
    try {
      setStatus("Saving…");
      const file = f.get("image") as File; const image = file?.size ? await upload(file) : initial?.image;
      if (!image) return setStatus("Choose a cover image.");
      const versions: Version[] = tiers.filter((t) => g(`${t}-mat`).trim()).map((t) => ({
        tier: t, extraCost: Number(g(`${t}-extra`) || 0), durability: g(`${t}-dur`), difficulty: g(`${t}-diff`) as Difficulty, time: g(`${t}-time`), pros: lines(g(`${t}-pros`)), cons: lines(g(`${t}-cons`)),
        materials: lines(g(`${t}-mat`)).map(parts).map(([name, qty, purpose, cost]) => ({ name, qty, purpose, cost: Number(cost) || 0 })),
        steps: lines(g(`${t}-steps`)).map(parts).map(([title, text, safety, tip, img]) => ({ title, text, safety: safety || undefined, tip: tip || undefined, image: img || undefined })) }));
      const body: Partial<Project> = { title: g("title"), description: g("description"), category: g("category"), difficulty: g("difficulty") as Difficulty, time: g("time"), image, gallery: initial?.gallery ?? [], featured: f.get("featured") === "on",
        tools: lines(g("tools")), safety: lines(g("safety")), mistakes: lines(g("mistakes")), alternatives: lines(g("alternatives")), tips: lines(g("tips")), versions };
      const res = await fetch(initial ? `/api/admin/projects/${initial.slug}` : "/api/admin/projects", { method: initial ? "PUT" : "POST", body: JSON.stringify(body) });
      if (!res.ok) return setStatus((await res.json()).error);
      r.push("/admin"); r.refresh();
    } catch (err) { setStatus((err as Error).message); }
  }
  const Area = ({ name, label, hint, def, rows = 3 }: { name: string; label: string; hint?: string; def?: string; rows?: number }) => (
    <label className="block text-sm"><span className="font-medium">{label}</span>{hint && <span className="ml-2 text-mute">{hint}</span>}<textarea name={name} rows={rows} defaultValue={def} className={`${inp} mt-1 font-mono text-xs`} /></label>);
  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">Cover image {initial && <span className="text-mute">(leave empty to keep current)</span>}<input name="image" type="file" accept="image/*" className={`${inp} mt-1`} /></label>
        <label className="text-sm">Title<input required name="title" defaultValue={initial?.title} className={`${inp} mt-1`} /></label>
        <label className="text-sm sm:col-span-2">Description<textarea required name="description" rows={3} defaultValue={initial?.description} className={`${inp} mt-1`} /></label>
        <label className="text-sm">Category<input required name="category" defaultValue={initial?.category} className={`${inp} mt-1`} /></label>
        <label className="text-sm">Estimated time<input name="time" defaultValue={initial?.time} placeholder="2–4 hours" className={`${inp} mt-1`} /></label>
        <label className="text-sm">Difficulty<select name="difficulty" defaultValue={initial?.difficulty} className={`${inp} mt-1`}><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="featured" defaultChecked={initial?.featured} /> Show in Featured projects</label>
      </div>
      <div className="rounded-xl border border-line p-4 text-sm"><p className="font-medium">Step image helper</p><p className="text-mute">Upload an image, then paste its URL as the 5th field of a step.</p>
        <input type="file" accept="image/*" className="mt-2" onChange={async (e) => { const f = e.target.files?.[0]; if (f) try { setLib(await upload(f)); } catch (x) { setLib((x as Error).message); } }} />{lib && <code className="ml-2">{lib}</code>}</div>
      {tiers.map((t) => { const v = V(t); return (
        <fieldset key={t} className="space-y-3 rounded-xl border border-line p-4">
          <legend className="px-2 font-display text-xl font-semibold capitalize">{t} version</legend>
          <div className="grid gap-3 sm:grid-cols-4">
            <input name={`${t}-extra`} type="number" step="0.01" defaultValue={v?.extraCost} placeholder="Tools/extra cost" aria-label="Extra cost" className={inp} />
            <input name={`${t}-dur`} defaultValue={v?.durability} placeholder="Lifespan" aria-label="Lifespan" className={inp} />
            <select name={`${t}-diff`} defaultValue={v?.difficulty} aria-label="Difficulty" className={inp}><option>Easy</option><option>Medium</option><option>Hard</option></select>
            <input name={`${t}-time`} defaultValue={v?.time} placeholder="Build time" aria-label="Build time" className={inp} />
          </div>
          <Area name={`${t}-mat`} label="Materials" hint="name | quantity | purpose | cost (leave all empty to skip this version)" def={v?.materials.map((m) => [m.name, m.qty, m.purpose, m.cost].join(" | ")).join("\n")} />
          <div className="grid gap-3 sm:grid-cols-2"><Area name={`${t}-pros`} label="Advantages" hint="one per line" rows={2} def={list(v?.pros)} /><Area name={`${t}-cons`} label="Limitations" hint="one per line" rows={2} def={list(v?.cons)} /></div>
          <Area name={`${t}-steps`} label="Steps" hint="title | text | warning | tip | image URL" rows={5} def={v?.steps.map((s) => [s.title, s.text, s.safety ?? "", s.tip ?? "", s.image ?? ""].join(" | ")).join("\n")} />
        </fieldset>); })}
      <div className="grid gap-4 sm:grid-cols-2">
        {([["tools", "Tools needed"], ["safety", "Safety precautions"], ["mistakes", "Common mistakes"], ["alternatives", "Alternative materials"], ["tips", "Beginner tips"]] as const).map(([n, l]) => <Area key={n} name={n} label={l} hint="one per line" def={list(initial?.[n])} />)}
      </div>
      <div className="flex items-center gap-3"><button className="rounded-lg bg-blue px-5 py-2 font-medium text-paper">{initial ? "Save changes" : "Publish project"}</button><span role="status" className="text-sm text-mute">{status}</span></div>
    </form>
  );
}
