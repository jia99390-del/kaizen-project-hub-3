"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Header() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const d = localStorage.getItem("theme") ? localStorage.getItem("theme") === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(d); document.documentElement.classList.toggle("dark", d);
  }, []);
  const toggle = () => { const d = !dark; setDark(d); document.documentElement.classList.toggle("dark", d); localStorage.setItem("theme", d ? "dark" : "light"); };
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-semibold">Kaizen Project Hub</Link>
        <nav className="flex items-center gap-4 text-sm">
          <button onClick={toggle} aria-label="Toggle dark mode" className="rounded-full border border-line px-3 py-1 hover:border-blue">{dark ? "Light" : "Dark"}</button>
        </nav>
      </div>
    </header>
  );
}
