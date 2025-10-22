export function Table({ rows }: { rows: { label: string; value: string | number | null }[] }) {
  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-400">
            <th className="py-2 pr-4">Indicateur</th>
            <th className="py-2">Valeur</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-slate-800/70">
              <td className="py-2 pr-4">{r.label}</td>
              <td className="py-2 tabular-nums">{r.value ?? "n/d"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
