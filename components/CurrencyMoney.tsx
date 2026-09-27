"use client";

import { useEffect, useState } from "react";
import { USD_TO_PKR } from "@/lib/types";

export default function CurrencyMoney({ amount }: { amount: number }) {
  const [currency, setCurrency] = useState<"USD" | "PKR">("USD");

  useEffect(() => {
    const saved = localStorage.getItem("currency");

    if (saved === "PKR") {
      setCurrency("PKR");
    }

    const updateCurrency = () => {
      const value = localStorage.getItem("currency");
      setCurrency(value === "PKR" ? "PKR" : "USD");
    };

    window.addEventListener("currency-change", updateCurrency);

    return () => {
      window.removeEventListener("currency-change", updateCurrency);
    };
  }, []);

  if (currency === "PKR") {
    return <>Rs{Math.round(amount * USD_TO_PKR).toLocaleString()}</>;
  }

  return <>${amount.toFixed(2)}</>;
}
