"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/http";
import type { AnnexDetailsResponse } from "../types";
import { PageHeader } from "@/components/simples-nacional/page-header";
import { AnnexInfoCard } from "@/components/simples-nacional/annex-info-card";
import { AnnexSummarySection } from "@/components/simples-nacional/annex-summary-section";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AnnexDetailsPage() {
  const [annexCode, setAnnexCode] = useState<string>("");
  const router = useRouter();
  const [annexDetails, setAnnexDetails] = useState<AnnexDetailsResponse | null>(
    null,
  );
  const [annexError, setAnnexError] = useState<string | null>(null);

  const annexMutation = useMutation({
    mutationFn: async (code: string) => {
      const { data } = await api.get<AnnexDetailsResponse>("annex", {
        params: { code },
      });
      return data;
    },
    onSuccess: (data) => {
      setAnnexError(null);
      setAnnexDetails(data);
    },
    onError: () => {
      setAnnexError("Não foi possível carregar as informações do anexo.");
      setAnnexDetails(null);
    },
  });

  function handleAnnexSearch() {
    if (!annexCode) {
      setAnnexError("Selecione um anexo para buscar.");
      return;
    }
    setAnnexError(null);
    annexMutation.mutate(annexCode);
  }

  return (
    <div className="min-h-screen bg-[#f6f9fb] text-slate-900">
      <PageHeader
        title="Detalhes dos anexos"
        actions={
          <>
            <Button
              variant="outline"
              className="border-white/40 bg-white/10 text-white shadow-sm backdrop-blur hover:bg-white/20 hover:cursor-pointer"
              onClick={() => router.push("/simples-nacional")}
            >
              <RotateCcw className="size-4" />
              Voltar
            </Button>
          </>
        }
      />
      <main className="mx-auto w-full space-y-8 px-4 py-8">
        <AnnexInfoCard
          annexCode={annexCode}
          onAnnexChange={setAnnexCode}
          onSearch={handleAnnexSearch}
          isLoading={annexMutation.isPending}
          error={annexError}
        />

        {annexDetails ? <AnnexSummarySection data={annexDetails} /> : null}
      </main>
    </div>
  );
}
