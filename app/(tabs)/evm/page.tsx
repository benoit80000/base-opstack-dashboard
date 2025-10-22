"use client";
import { useEffect, useState } from "react";
import { Table } from "@/components/Table";

type LlamaChain = {
  name: string;
  tvl?: number;
  tvlPrevDay?: number;
  tvlPrevWeek?: number;
  tvlPrevMonth?: number;
};

export default function EvmTab() {
  const [rows, setRows] = useState<{ label: string; value: number | string | null }[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      const r = await fetch("https://api.llama.fi/chains", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = (await r.json()) as LlamaChain[];
      const evm = d.filter((c) => true); // simple: afficher tout (DefiLlama inclut majoritairement des chaînes EVM)
      const top = evm
        .filter((c) => Number.isFinite(Number(c.tvl)))
        .sort((a, b) => Number(b.tvl ?? 0) - Number(a.tvl ?? 0))
        .slice(0, 30);
      setRows(
        top.map((c) => ({
          label: c.name,
          value: Number(c.tvl ?? 0)
        }))
      );
    } catch (e: any) {
      setErr(e?.message ?? "Erreur inconnue");
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">EVM global — TVL (DefiLlama)</h1>
      {err && <div className="card text-red-300">Erreur : {err}</div>}
      <Table rows={rows} />
      <div className="sub">Données : <a className="link" href="https://api-docs.defillama.com/" target="_blank">DefiLlama API</a></div>
    </div>
  );
}
