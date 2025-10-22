import "@/styles/globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Base + OP Stack Dashboard",
  description: "Indicateurs Base, OP Stack et EVM — endpoints publics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="border-b border-slate-800/80">
          <nav className="container py-3 flex items-center gap-4">
            <Link href="/base" className="link">Base</Link>
            <Link href="/op" className="link">OP Stack</Link>
            <Link href="/evm" className="link">EVM global</Link>
            <div className="ml-auto text-xs opacity-70">
              Sources : <a className="link" href="https://base.blockscout.com/" target="_blank">Blockscout/Base</a>,{" "}
              <a className="link" href="https://explorer.optimism.io/" target="_blank">OP Mainnet</a>,{" "}
              <a className="link" href="https://stats.optimism.io" target="_blank">Superchain (officiel)</a>,{" "}
              <a className="link" href="https://api-docs.defillama.com/" target="_blank">DefiLlama</a>
            </div>
          </nav>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
