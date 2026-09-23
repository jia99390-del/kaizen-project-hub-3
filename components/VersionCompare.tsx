"use client";
import { useState } from "react";
import { Version, materialsTotal, projectTotal, money } from "@/lib/types";
const label = { budget: "Budget", standard: "Standard", premium: "Premium" } as const;
export default function VersionCompare({ versions }: { versions: Version[] }) {
  const [active, setActive] = useState(0);
  const v = versions[active];
  return (
    <>
      <section aria-labelledby="versions" className="mt-14">
        <h2 id="versions" className="font-display text-3xl font-semibold">Choose your version</h2>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {versions.map((x, i) => (
            <article key={x.tier} className={`flex flex-col rounded-xl border bg-card p-5 transition ${i === active ? "border-blue shadow-md" : "border-line"}`}>
              <div className="flex items-baseline justify-between"><h3 className="font-display text-2xl font-semibold">{label[x.tier]}</h3><span className="text-xl font-semibold">{money(projectTotal(x))}</span></div>
              <div className="mt-4 overflow-x-auto"><table className="w-full text-sm"><thead className="text-left text-mute"><tr><th className="pb-1 font-normal">Material</th><th className="font-normal">Qty</th><th className="text-right font-normal">Cost</th></tr></thead>
                <tbody>{x.materials.map((m, j) => <tr key={j} className="border-t border-line align-top"><td className="py-1.5 pr-2">{m.name}<div className="text-xs text-mute">{m.purpose}</div></td><td className="pr-2">{m.qty}</td><td className="text-right">{money(m.cost)}</td></tr>)}</tbody></table></div>
              <dl className="mt-3 space-y-1 border-t border-line pt-3 text-sm">
                <div className="flex justify-between"><dt className="text-mute">Materials</dt><dd>{money(materialsTotal(x))}</dd></div>
                <div className="flex justify-between"><dt className="text-mute">Tools & consumables</dt><dd>{money(x.extraCost)}</dd></div>
                <div className="flex justify-between font-semibold"><dt>Total project cost</dt><dd>{money(projectTotal(x))}</dd></div></dl>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
                <div><p className="font-medium">Advantages</p><ul className="list-disc pl-5 text-mute">{x.pros.map((t) => <li key={t}>{t}</li>)}</ul></div>
                <div><p className="font-medium">Limitations</p><ul className="list-disc pl-5 text-mute">{x.cons.map((t) => <li key={t}>{t}</li>)}</ul></div></div>
              <button onClick={() => setActive(i)} className="mt-auto pt-5 text-left text-sm font-medium text-blue hover:underline">{i === active ? "Showing steps below" : `Show ${label[x.tier]} steps`}</button>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="cmp">
        <h2 id="cmp" className="font-display text-3xl font-semibold">Cost comparison</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line"><table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-card text-mute"><tr>{["Version", "Total cost", "Durability", "Difficulty", "Build time"].map((h) => <th key={h} className="p-3 font-medium">{h}</th>)}</tr></thead>
          <tbody>{versions.map((x) => <tr key={x.tier} className="border-t border-line"><td className="p-3 font-medium">{label[x.tier]}</td><td className="p-3">{money(projectTotal(x))}</td><td className="p-3">{x.durability}</td><td className="p-3">{x.difficulty}</td><td className="p-3">{x.time}</td></tr>)}</tbody></table></div>
      </section>

      <section className="mt-12" aria-labelledby="steps">
        <h2 id="steps" className="font-display text-3xl font-semibold">Step-by-step instructions</h2>
        <div role="tablist" className="mt-4 inline-flex rounded-full border border-line p-1">
          {versions.map((x, i) => <button key={x.tier} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`rounded-full px-4 py-1.5 text-sm transition ${i === active ? "bg-blue text-white" : "text-mute hover:text-ink"}`}>{label[x.tier]}</button>)}
        </div>
        <ol key={active} className="mt-6 space-y-5">
          {v.steps.map((s, i) => (
            <li key={i} className="rise flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue text-sm font-semibold text-white">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-1 max-w-prose text-mute">{s.text}</p>
                {s.image && /* eslint-disable-next-line @next/next/no-img-element */ <img src={s.image} alt={s.title} loading="lazy" className="mt-3 max-h-80 rounded-lg border border-line" />}
                {s.safety && <p className="mt-3 rounded-lg border-l-4 border-red-500 bg-red-500/10 p-3 text-sm"><b>Safety:</b> {s.safety}</p>}
                {s.tip && <p className="mt-3 rounded-lg border-l-4 border-blue bg-blue/10 p-3 text-sm"><b>Tip:</b> {s.tip}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
