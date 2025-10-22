"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Table } from "@/components/Table";

type ChainRow = { name: string; total: number | null };

type APIResponse = {
  base: { total_transactions: number; raw: any };
  opstack: { total_transactions_sum: number; per_chain: ChainRow[] };
  ratios: { base_vs_opstack: number | null };
  sources: Record<string, string>;
};

export default function OpTab() {
  const [data, setData] = useState<APIResponse | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      const r = await fetch("/api/opstack", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = (await r.json()) as APIResponse;
      setData(d);
    } catch (e: any) {
      setErr(e?.message ?? "Erreur inconnue");
    }
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">OP Stack — Agrégats (somme Blockscout) & Ratio</h1>
      {err && <div className="card text-red-300">Erreur : {err}</div>}
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Tx totales — Base" value={data?.base.total_transactions} />
        <Card title="Tx totales — OP Stack (somme)" value={data?.opstack.total_transactions_sum} />
        <Card title="Part de Base dans OP Stack" value={data?.ratios.base_vs_opstack != null ? (data!.ratios.base_vs_opstack * 100).toFixed(1) + "%" : "—"} />
      </div>
      <Table
        rows={(data?.opstack.per_chain ?? []).map((c) => ({
          label: c.name,
          value: c.total ?? null
        }))}
      />
      <div className="sub">
        Références : Superchain (officiel) <a className="link" href="https://stats.optimism.io" target="_blank">stats.optimism.io</a>
      </div>
    </div>
  );
}
