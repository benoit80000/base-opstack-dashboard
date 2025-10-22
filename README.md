# Base + OP Stack — Dashboard

Indicateurs Base (Blockscout), agrégat OP Stack (somme Blockscout) + onglet EVM (DefiLlama). 100% gratuit et déployable en ligne (GitHub + Vercel).

## Démarrage local (facultatif)
```bash
pnpm install
pnpm dev
# http://localhost:3000
```

## Déploiement en ligne (sans rien installer)
1. Crée un repo **GitHub** et uploade ces fichiers.
2. Sur **Vercel**, importe le repo → Deploy.

## Endpoints publics utilisés
- Base (Blockscout): https://base.blockscout.com/api/v2/stats
- OP Mainnet (Blockscout): https://explorer.optimism.io/api/v2/stats
- Superchain (officiel / dashboard): https://stats.optimism.io
- DefiLlama API: https://api.llama.fi/chains

## Onglets
- **Base** : tx totales, tx jour, temps de bloc, adresses, etc.
- **OP Stack** : somme de `total_transactions` pour plusieurs chaînes OP Stack compatibles Blockscout + **ratio** Base/OP.
- **EVM global** : TVL par chaîne via DefiLlama.

## Ajouter des chaînes OP Stack
Édite `app/api/opstack/route.ts` et ajoute des entrées dans `opChains` :
```ts
{ name: "Zora", statsUrl: "https://zora.blockscout.com/api/v2/stats" },
{ name: "Mode", statsUrl: "https://explorer.mode.network/api/v2/stats" },
```
