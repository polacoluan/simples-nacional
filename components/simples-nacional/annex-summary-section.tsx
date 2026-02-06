import { SummaryStats } from "@/components/simples-nacional/summary-stats";
import type { AnnexDetailsResponse } from "@/app/simples-nacional/types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

function formatMoney(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value))
    return currencyFormatter.format(0);
  return currencyFormatter.format(value);
}

function formatPercent(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "0%";
  return `${percentFormatter.format(value)}%`;
}

type AnnexSummarySectionProps = {
  data: AnnexDetailsResponse;
};

export function AnnexSummarySection({ data }: AnnexSummarySectionProps) {
  return (
    <div className="space-y-6">
      {Object.entries(data).map(([label, details]) => {
        const items = [
          {
            label: "Receita mínima",
            value: formatMoney(details.calcs.revenue_min),
            helper: "Limite inferior da faixa (RBT12).",
          },
          {
            label: "Receita máxima",
            value: formatMoney(details.calcs.revenue_max),
            helper: "Limite superior da faixa (RBT12).",
          },
          {
            label: "Alíquota nominal",
            value: formatPercent(details.calcs.rate_percent),
            helper: "Percentual da faixa antes das deduções.",
          },
          {
            label: "Valor a deduzir",
            value: formatMoney(details.calcs.deduction_amount),
            helper: "Parcela a deduzir conforme o anexo.",
          },
          {
            label: "IRPJ",
            value: formatPercent(details.partitions.irpj_percent),
            helper: "Percentual do IRPJ na repartição.",
          },
          {
            label: "CSLL",
            value: formatPercent(details.partitions.csll_percent),
            helper: "Percentual da CSLL na repartição.",
          },
          {
            label: "COFINS",
            value: formatPercent(details.partitions.cofins_percent),
            helper: "Percentual da COFINS na repartição.",
          },
          {
            label: "PIS/Pasep",
            value: formatPercent(details.partitions.pis_pasep_percent),
            helper: "Percentual do PIS/Pasep na repartição.",
          },
          {
            label: "CPP",
            value: formatPercent(details.partitions.cpp_percent),
            helper: "Percentual da CPP na repartição.",
          },
          ...(details.partitions.icms_percent !== undefined
            ? [
                {
                  label: "ICMS",
                  value: formatPercent(details.partitions.icms_percent),
                  helper: "Percentual do ICMS na repartição.",
                },
              ]
            : []),
          ...(details.partitions.iss_percent !== undefined
            ? [
                {
                  label: "ISS",
                  value: formatPercent(details.partitions.iss_percent),
                  helper: "Percentual do ISS na repartição.",
                },
              ]
            : []),
        ];

        return (
          <SummaryStats
            key={label}
            title={label}
            description="Faixa e repartição de tributos do anexo selecionado."
            items={items}
            columns={4}
          />
        );
      })}
    </div>
  );
}
