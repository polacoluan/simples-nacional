export type SimplesNacionalPayload = {
  annex: string;
  gross_income: number;
  month_income: number;
};

export type InitialFormValues = {
  annex: string;
  gross_income: number | undefined;
  month_income: number | undefined;
};

export type SimplesNacionalResult = {
  annex: string;
  effective_tax_rate: number;
  gross_income: number;
  month_income: number;
  tax_due: number;
  frame: SimplesNacionalFrame;
  partition_breakdown: SimplesNacionalPartition;
};

export type SimplesNacionalFrame = {
  bracket: string;
  revenue_min: number;
  revenue_max: number;
  rate_percent: number;
  deduction_amount: number;
};

export type SimplesNacionalPartition = {
  irpj: Partition;
  csll: Partition;
  cofins: Partition;
  pis_pasep: Partition;
  cpp: Partition;
  icms?: Partition | undefined;
  iss?: Partition | undefined;
};

export type Partition = {
  percent_of_tax: number;
  effective_rate: number;
  amount: number;
};

export type AnnexCalc = {
  revenue_min: number;
  revenue_max: number;
  rate_percent: number;
  deduction_amount: number;
};

export type AnnexPartitions = {
  irpj_percent: number;
  csll_percent: number;
  cofins_percent: number;
  pis_pasep_percent: number;
  cpp_percent: number;
  icms_percent?: number;
  iss_percent?: number;
};

export type AnnexBracket = {
  calcs: AnnexCalc;
  partitions: AnnexPartitions;
};

export type AnnexDetailsResponse = Record<string, AnnexBracket>;

export type SimplesNacionalApiResponse = SimplesNacionalResult;
