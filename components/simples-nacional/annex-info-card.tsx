import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AnnexInfoCardProps = {
  annexCode: string;
  onAnnexChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  error: string | null;
};

export function AnnexInfoCard({
  annexCode,
  onAnnexChange,
  onSearch,
  isLoading,
  error,
}: AnnexInfoCardProps) {
  return (
    <Card className="w-full border-none shadow-[0_10px_35px_rgba(1,76,116,0.08)]">
      <CardHeader className="rounded-t-xl">
        <CardTitle className="text-2xl text-slate-900">
          Informações sobre cada anexo
        </CardTitle>
        <CardDescription className="text-slate-600">
          Selecione um anexo para visualizar as faixas, alíquotas e repartições.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 bg-white">
        <section className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 shadow-sm">
          <div className="flex items-center justify-between gap-2 ">
            <h2 className="flex items-center gap-3 text-lg font-semibold text-slate-900">
              <span aria-hidden className="h-8 w-1 rounded-full bg-[#014c74]" />
              Informações sobre cada anexo
            </h2>
          </div>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-base font-medium text-slate-900">Anexo</p>
              <Select value={annexCode} onValueChange={onAnnexChange}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Selecione o anexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Selecione o anexo</SelectLabel>
                    <SelectItem value="annex_i">Anexo I</SelectItem>
                    <SelectItem value="annex_ii">Anexo II</SelectItem>
                    <SelectItem value="annex_iii">Anexo III</SelectItem>
                    <SelectItem value="annex_iv">Anexo IV</SelectItem>
                    <SelectItem value="annex_v">Anexo V</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <Button
              className="hover:cursor-pointer bg-[#014c74] text-white hover:bg-[#013d5d] "
              type="button"
              disabled={!annexCode || isLoading}
              onClick={onSearch}
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </Button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
