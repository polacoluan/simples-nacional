"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/http";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  InitialFormValues,
  SimplesNacionalApiResponse,
  SimplesNacionalPayload,
} from "./types";
import { PageHeader } from "@/components/simples-nacional/page-header";
import { InitialFormCard } from "@/components/simples-nacional/initial-form-card";
import Link from "next/link";
import { FileInput } from "lucide-react";
import { Button } from "@/components/ui/button";

const requiredNumber = z
  .number({ error: "Informe um número válido" })
  .min(0, "Obrigatório");

const formSchema = z.object({
  annex: z.string().min(1, "Selecione o anexo"),
  gross_income: requiredNumber,
  month_income: requiredNumber,
});

export default function InitialData() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<InitialFormValues>({
    resolver: zodResolver(formSchema) as Resolver<InitialFormValues>,
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      annex: "",
      gross_income: undefined,
      month_income: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: SimplesNacionalPayload) => {
      const { data } = await api.post<SimplesNacionalApiResponse>(
        "simples-nacional",
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["simples-nacional", "result"], data);
      router.push("/simples-nacional/results");
    },
    onError: () => {
      setSubmitError("Não foi possível enviar os dados. Tente novamente.");
    },
  });

  function onSubmit(values: InitialFormValues) {
    setSubmitError(null);
    const payload: SimplesNacionalPayload = formSchema.parse(values);
    mutation.mutate(payload);
  }

  return (
    <div className="min-h-screen bg-[#f6f9fb] text-slate-900">
      <PageHeader
        title="Configurar cenário"
        actions={
          <Link href="/simples-nacional/annex">
            <Button
              variant="outline"
              className="border-white/40 bg-white/10 text-white shadow-sm backdrop-blur hover:bg-white/20 hover:cursor-pointer"
            >
              <FileInput className="size-4" />
              Ver detalhes dos anexos
            </Button>
          </Link>
        }
      />
      <main className="mx-auto w-full px-4 py-8">
        <div className="space-y-6">
          <InitialFormCard
            form={form}
            onSubmit={onSubmit}
            onInvalid={() =>
              setSubmitError("Preencha todos os campos obrigatórios.")
            }
            submitError={submitError}
            isSubmitting={mutation.isPending}
          />
        </div>
      </main>
    </div>
  );
}
