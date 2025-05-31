export interface SearchParams {
  minPrice?: string;
  maxPrice?: string;
  sort?: "rate" | "price";
  order?: "asc" | "desc";
  transactionType?: "mortgage" | "rental" | "reservation" | "direct_purchase";
  search?: string;
}

export type SearchParamsType = { [key: string]: string | string[] | undefined };
