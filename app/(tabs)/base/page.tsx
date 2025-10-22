"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Table } from "@/components/Table";

type Stats = {
  total_transactions?: string | number;
  transactions_today?: string | number;
  avg_block_time?: string | number;
  total_addresses?: string | number;
  [k: string]: any;
};

export default function BaseTab() {
  const [data, setData] = useState<Stats | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setErr(null);
      const r = await fetch("https://base.blockscout.com/api/v2/stats", { cache: "no-store" });
      if (!r.ok) throw new Error("HTTP " + r.status);
      const d = await r.json();
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
      <h1 className="text-2xl font-bold">Base — Indicateurs (API Blockscout)</h1>
      {err && <div className="card text-red-300">Erreur : {err}</div>}
      <div className="grid md:grid-cols-4 gap-4">
        <Card title="Tx totales" value={normalize(data?.total_transactions)} />
        <Card title="Tx aujourd’hui" value={normalize(data?.transactions_today)} />
        <Card title="Temps bloc moyen (s)" value={normalize(data?.avg_block_time)} />
        <Card title="Adresses totales" value={normalize(data?.total_addresses)} />
      </div>
      <Table
        rows={[
          { label: "Blocs totaux", value: normalize(data?.total_blocks) },
          { label: "Comptes/Contrats", value: normalize(data?.total_contracts) },
          { label: "Tx 24h", value: normalize(data?.transactions_24h) },
          { label: "Tx 7j", value: normalize(data?.transactions_1w) },
          { label: "Gas prix moyen", value: normalize(data?.avg_gas_price) }
        ]}
      />
    </div>
  );
}

function normalize(v: any) {
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : String(v);
}
