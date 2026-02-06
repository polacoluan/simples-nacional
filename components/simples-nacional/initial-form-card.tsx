import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UseFormReturn } from "react-hook-form";
import MoneyInput from "@/components/resources/money-input";
import type { InitialFormValues } from "@/app/simples-nacional/types";

type InitialFormCardProps = {
  form: UseFormReturn<InitialFormValues>;
  onSubmit: (values: InitialFormValues) => void;
  onInvalid: () => void;
  submitError: string | null;
  isSubmitting: boolean;
};

export function InitialFormCard({
  form,
  onSubmit,
  onInvalid,
  submitError,
  isSubmitting,
}: InitialFormCardProps) {
  return (
    <Card className="w-full border-none shadow-[0_10px_35px_rgba(1,76,116,0.08)]">
      <CardHeader className="rounded-t-xl">
        <CardTitle className="text-2xl text-slate-900">
          Calculadora do Simples Nacional
        </CardTitle>
        <CardDescription className="text-slate-600">
          Preencha os dados da sua empresa para verificar os dados do simples
          nacional.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          <CardContent className="space-y-6 bg-white">
            <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-amber-500"
              />
              Preencha todos os campos para avançar.
            </div>
            <section className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 ">
                <h2 className="flex items-center gap-3 text-lg font-semibold text-slate-900">
                  <span
                    aria-hidden
                    className="h-8 w-1 rounded-full bg-[#014c74]"
                  />
                  Dados para o cálculo
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                <FormField
                  control={form.control}
                  name="annex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-slate-900">
                        Anexo
                      </FormLabel>
                      <FormControl>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o anexo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Selecione o anexo</SelectLabel>
                              <SelectItem value="annex_i">Anexo I</SelectItem>
                              <SelectItem value="annex_ii">Anexo II</SelectItem>
                              <SelectItem value="annex_iii">
                                Anexo III
                              </SelectItem>
                              <SelectItem value="annex_iv">
                                Anexo IV
                              </SelectItem>
                              <SelectItem value="annex_v">Anexo V</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <MoneyInput
                  form={form}
                  name={"gross_income"}
                  label="Receita Bruta dos últimos 12 meses"
                  placeholder="R$ 0,00"
                />
                <MoneyInput
                  form={form}
                  name={"month_income"}
                  label="Receita Bruta do mês"
                  placeholder="R$ 0,00"
                />
              </div>
            </section>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 border-t border-slate-100 bg-linnear-to-r from-white via-[rgba(1,76,116,0.04)] to-[rgba(191,137,0,0.05)] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            {submitError ? (
              <p className="flex-1 text-sm text-red-600">{submitError}</p>
            ) : (
              <p className="flex-1 text-sm text-slate-500">
                Revise os dados antes de avançar para a simulação.
              </p>
            )}
            <Button
              className="hover:cursor-pointer border border-[#bf8900] bg-white text-[#bf8900] hover:bg-[#bf8900] hover:text-white"
              type="button"
              onClick={() => history.back()}
            >
              Voltar
            </Button>
            <Button
              className="hover:cursor-pointer bg-[#014c74] text-white hover:bg-[#013d5d]"
              type="submit"
              disabled={isSubmitting || !form.formState.isValid}
            >
              {isSubmitting ? "Enviando..." : "Avançar"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
