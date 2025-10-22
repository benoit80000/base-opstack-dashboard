import { NextResponse } from "next/server";

type Stats = { total_transactions?: string | number };

const TIMEOUT = 8000;

async function fetchJSON(url: string) {
  const c = new AbortController();
  const id = setTimeout(() => c.abort(), TIMEOUT);
  try {
    const r = await fetch(url, { cache: "no-store", signal: c.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } finally {
    clearTimeout(id);
  }
}

export async function GET() {
  // 1) Base stats (Blockscout)
  const baseStats = (await fetchJSON("https://base.blockscout.com/api/v2/stats")) as Stats;

  // 2) OP chains (exemples Blockscout). Vous pouvez compléter dynamiquement via la Superchain Registry.
  const opChains = [
    { name: "OP Mainnet", statsUrl: "https://explorer.optimism.io/api/v2/stats" },
    { name: "Base", statsUrl: "https://base.blockscout.com/api/v2/stats" },
    // { name: "Zora", statsUrl: "https://zora.blockscout.com/api/v2/stats" },
    // { name: "Mode", statsUrl: "https://explorer.mode.network/api/v2/stats" },
  ];

  let opstackTotal = 0;
  const perChain: Array<{ name: string; total: number | null }> = [];

  for (const c of opChains) {
    try {
      const d = (await fetchJSON(c.statsUrl)) as Stats;
      const val = Number(d.total_transactions ?? 0);
      if (!Number.isFinite(val)) throw new Error("no total_transactions");
      opstackTotal += val;
      perChain.push({ name: c.name, total: val });
    } catch {
      perChain.push({ name: c.name, total: null });
    }
  }

  const baseTotal = Number(baseStats.total_transactions ?? 0);
  const ratioBaseInOP = opstackTotal > 0 ? baseTotal / opstackTotal : null;

  // 3) EVM global (ex: TVL par chaîne via DefiLlama)
  const chains = await fetchJSON("https://api.llama.fi/chains");

  return NextResponse.json({
    base: { total_transactions: baseTotal, raw: baseStats },
    opstack: { total_transactions_sum: opstackTotal, per_chain: perChain },
    ratios: { base_vs_opstack: ratioBaseInOP },
    evm_defillama: chains,
    sources: {
      base_blockscout: "https://base.blockscout.com/api/v2/stats",
      op_blockscout: "https://explorer.optimism.io/api/v2/stats",
      superchain_official_dashboard: "https://stats.optimism.io",
      defillama_api: "https://api.llama.fi/chains"
    }
  });
}
