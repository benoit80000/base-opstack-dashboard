export function Card({ title, value }: { title: string; value?: number | string | null }) {
  return (
    <div className="card">
      <div className="title">{title}</div>
      <div className="value">{value != null ? (typeof value === "number" ? value.toLocaleString() : value) : "—"}</div>
    </div>
  );
}
