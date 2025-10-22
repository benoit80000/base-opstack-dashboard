// Idée: récupérer dynamiquement la liste des chaînes OP Stack depuis
// https://github.com/ethereum-optimism/superchain-registry
// et extraire les URLs des explorers Blockscout pour appeler /api/v2/stats.
// Ici on laisse un stub à compléter si besoin.
export type OPChain = { name: string; statsUrl?: string };

export async function loadOPChains(): Promise<OPChain[]> {
  return [
    { name: "OP Mainnet", statsUrl: "https://explorer.optimism.io/api/v2/stats" },
    { name: "Base", statsUrl: "https://base.blockscout.com/api/v2/stats" },
  ];
}
