import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  badge?: string;
  actions?: ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  eyebrow = "Calculadora do Simples Nacional",
  badge,
  actions,
}: PageHeaderProps) {
  return (
    <header className="bg-linear-to-r from-[#014c74] via-[#0f5f90] to-[#bf8900] text-white shadow-md">
      <div className="mx-auto flex w-full flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/70">
            {eyebrow}
          </p>
          <h1 className="text-2xl font-semibold leading-tight">{title}</h1>
          {subtitle ? (
            <p className="text-sm text-white/80">{subtitle}</p>
          ) : null}
        </div>
        {badge || actions ? (
          <div className="flex flex-wrap items-center gap-3">
            {badge ? (
              <span className="rounded-full border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur">
                {badge}
              </span>
            ) : null}
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
