"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "PKR">("USD");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedCurrency = localStorage.getItem("currency");

    const d = savedTheme
      ? savedTheme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;

    setDark(d);
    document.documentElement.classList.toggle("dark", d);

    if (savedCurrency === "PKR") {
      setCurrency("PKR");
    }
  }, []);

  const toggle = () => {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle("dark", d);
    localStorage.setItem("theme", d ? "dark" : "light");
  };

  const toggleCurrency = () => {
    const next = currency === "USD" ? "PKR" : "USD";
    setCurrency(next);
    localStorage.setItem("currency", next);
    window.dispatchEvent(new Event("currency-change"));
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-semibold">
          Kaizen Project Hub
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <button
            onClick={toggleCurrency}
            aria-label="Toggle currency"
            className="rounded-full border border-line px-3 py-1 hover:border-blue"
          >
            {currency === "USD" ? "USD $" : "PKR ₨"}
          </button>

          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="rounded-full border border-line px-3 py-1 hover:border-blue"
          >
            {dark ? "Light" : "Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}
