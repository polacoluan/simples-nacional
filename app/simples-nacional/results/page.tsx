"use client";

import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Printer, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Partition, SimplesNacionalResult } from "../types";
import { PageHeader } from "@/components/simples-nacional/page-header";
import { SummaryStats } from "@/components/simples-nacional/summary-stats";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
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

type StatCard = {
  label: string;
  value: string;
  helper: string;
};

function buildPartitionStats(partition?: Partition): StatCard[] {
  if (!partition) return [];
  const { percent_of_tax, effective_rate, amount } = partition;
  return [
    {
      label: "Percentual",
      value: formatPercent(percent_of_tax),
      helper: "Participação no total do Simples.",
    },
    {
      label: "Alíquota efetiva",
      value: formatPercent(effective_rate),
      helper: "Percentual aplicado sobre a receita do mês.",
    },
    {
      label: "Valor",
      value: formatMoney(amount),
      helper: "Parcela do imposto devida para este tributo.",
    },
  ];
}

export default function ResultsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const result = queryClient.getQueryData<SimplesNacionalResult>([
    "simples-nacional",
    "result",
  ]);

  const frame = result?.frame;
  const partitionBreakdown = result?.partition_breakdown;

  const stats: StatCard[] = result
    ? [
        {
          label: "Anexo",
          value: result.annex,
          helper: "Anexo selecionado para o cálculo.",
        },
        {
          label: "RBT12 (12 meses)",
          value: formatMoney(result.gross_income),
          helper: "Soma da receita bruta dos últimos 12 meses.",
        },
        {
          label: "Receita mensal",
          value: formatMoney(result.month_income),
          helper: "Receita bruta do mês informado.",
        },
        {
          label: "Alíquota efetiva",
          value: formatPercent(result.effective_tax_rate),
          helper: "Após deduções do anexo",
        },
        {
          label: "Imposto devido",
          value: formatMoney(result.tax_due),
          helper: "Calculado para o mês",
        },
      ]
    : [];

  const frameStats: StatCard[] = frame
    ? [
        {
          label: "Faixa",
          value: frame.bracket,
          helper: "Faixa de receita conforme o anexo selecionado.",
        },
        {
          label: "Receita mínima",
          value: formatMoney(frame.revenue_min),
          helper: "Limite inferior da faixa (RBT12).",
        },
        {
          label: "Receita máxima",
          value: formatMoney(frame.revenue_max),
          helper: "Limite superior da faixa (RBT12).",
        },
        {
          label: "Alíquota",
          value: formatPercent(frame.rate_percent),
          helper: "Percentual aplicado antes das deduções.",
        },
        {
          label: "Valor a deduzir",
          value: formatMoney(frame.deduction_amount),
          helper: "Parcela a deduzir conforme o anexo.",
        },
      ]
    : [];

  const partitionStats = partitionBreakdown
    ? [
        { title: "IRPJ", items: buildPartitionStats(partitionBreakdown.irpj) },
        { title: "CSLL", items: buildPartitionStats(partitionBreakdown.csll) },
        {
          title: "COFINS",
          items: buildPartitionStats(partitionBreakdown.cofins),
        },
        {
          title: "PIS/Pasep",
          items: buildPartitionStats(partitionBreakdown.pis_pasep),
        },
        { title: "CPP", items: buildPartitionStats(partitionBreakdown.cpp) },
        partitionBreakdown.icms
          ? {
              title: "ICMS",
              items: buildPartitionStats(partitionBreakdown.icms),
            }
          : {
              title: "ISS",
              items: buildPartitionStats(partitionBreakdown.iss),
            },
      ].filter((section) => section.items.length > 0)
    : [];

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f4fb] px-6">
        <div className="max-w-xl rounded-2xl border border-[#eadff7] bg-white p-8 text-center shadow-[0_10px_35px_rgba(55,23,111,0.08)]">
          <p className="text-lg font-semibold text-[#3b1d64]">
            Ops! Nenhum resultado encontrado.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Envie os dados da empresa para gerar a simulação do Simples
            Nacional.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              className="bg-[#3b1d64] text-white hover:bg-[#321753] hover:cursor-pointer"
              onClick={() => router.push("/simples-nacional")}
            >
              <ArrowLeft className="size-4" />
              Voltar para o formulário
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9fb] text-slate-900">
      <PageHeader
        title="Resultado do cálculo"
        actions={
          <>
            <Button
              variant="outline"
              className="border-white/40 bg-white/10 text-white shadow-sm backdrop-blur hover:bg-white/20 hover:cursor-pointer"
              onClick={() => router.push("/simples-nacional")}
            >
              <RotateCcw className="size-4" />
              Novo cálculo
            </Button>
            <Button
              className="bg-white text-[#014c74] hover:bg-white/90 hover:cursor-pointer"
              onClick={() => window.print()}
            >
              <Printer className="size-4" />
              Imprimir
            </Button>
          </>
        }
      />

      <main className="mx-auto w-full space-y-8 px-4 py-8">
        <SummaryStats
          description="Indicadores principais do Simples Nacional com base no anexo selecionado."
          items={stats}
          columns={5}
        />

        <SummaryStats
          title="Enquadramento do Anexo"
          description="Faixa e alíquotas aplicadas conforme a receita bruta dos últimos 12 meses (RBT12)."
          items={frameStats}
          columns={5}
        />

        <section className="rounded-2xl border border-[#d9e6ef] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(1,76,116,0.08)]">
          <p className="text-sm font-semibold text-[#014c74]">Notas</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>
              A alíquota efetiva considera a dedução aplicada ao percentual do
              anexo informado.
            </li>
            <li>
              O imposto devido é calculado sobre a receita do mês informada no
              formulário.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-[#d9e6ef] bg-white px-5 py-4 shadow-[0_10px_35px_rgba(1,76,116,0.08)]">
          <p className="text-sm font-semibold text-[#014c74]">
            Repartição dos Tributos
          </p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>
              A distribuição por tributo considera a alíquota efetiva e o valor
              calculado para o mês.
            </li>
          </ul>

          <div className="grid lg:grid-cols-2 gap-2 mt-2 sm:grid-cols-1 xl:grid-cols-2">
            {partitionStats.map((section) => (
              <SummaryStats
                key={section.title}
                title={section.title}
                description="Detalhamento da repartição do Simples Nacional."
                items={section.items}
                columns={3}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
