type StatItem = {
  label: string;
  value: string;
  helper?: string;
};

type SummaryStatsProps = {
  title?: string;
  description?: string;
  items?: StatItem[];
  columns?: number;
};

const columnsClassMap: Record<
  NonNullable<SummaryStatsProps["columns"]>,
  string
> = {
  1: "lg:grid-cols-1 print:grid-cols-1",
  2: "lg:grid-cols-2 print:grid-cols-2",
  3: "lg:grid-cols-3 print:grid-cols-2",
  4: "lg:grid-cols-4 print:grid-cols-2",
  5: "lg:grid-cols-5 print:grid-cols-2",
  6: "lg:grid-cols-6 print:grid-cols-2",
  7: "lg:grid-cols-7 print:grid-cols-2",
};

export function SummaryStats({
  title = "Resumo do cálculo",
  description,
  items = [],
  columns = 4,
}: SummaryStatsProps) {
  return (
    <section className="rounded-2xl border border-[#d9e6ef] bg-white p-6 shadow-[0_10px_35px_rgba(1,76,116,0.08)]">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#014c74]">
          {title}
        </p>
        {description ? (
          <p className="text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
      <div
        className={`mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 ${columnsClassMap[columns]}`}
      >
        {items.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#dfeaf0] bg-linear-to-br from-white to-[#f3f7fa] px-4 py-3 shadow-inner shadow-[#dbe9f3]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#014c74]">
              {stat.label}
            </p>
            <p className="mt-2 text-xl font-semibold text-[#0d3650]">
              {stat.value}
            </p>
            {stat.helper ? (
              <p className="text-xs text-slate-500">{stat.helper}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
