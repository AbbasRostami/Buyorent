"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import SearchAndFilter from "./SearchAndFilter";
import SortOptions from "./SortOptions";

interface ClientWrapperProps {
  initialData: any;
}

const ClientWrapper = ({ initialData }: ClientWrapperProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedSearch] = useDebounce(searchValue, 500);

  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    transactionType: "",
    minRent: "",
    maxRent: "",
    minMortgage: "",
    maxMortgage: "",
    sort: "",
    search: "",
  });

  const isFilterActive = () => {
    const paramsToCheck = [
      "search",
      "location",
      "propertyType",
      "transactionType",
      "minRent",
      "maxRent",
      "minMortgage",
      "maxMortgage",
      "sort",
      "order",
      "search",
    ];

    return paramsToCheck.some((param) => {
      const value = searchParams.get(param);
      return value !== null && value !== "" && value !== undefined;
    });
  };

  const updateQueryParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (sort: string, order: string) => {
    updateQueryParams({ sort, order });
  };

  useEffect(() => {
    updateQueryParams({ search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <>
      <SearchAndFilter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isFilterActive={isFilterActive()}
        onClearFilters={() => {
          setFilters({
            location: "",
            propertyType: "",
            transactionType: "",
            minRent: "",
            maxRent: "",
            minMortgage: "",
            maxMortgage: "",
            sort: "",
          });
          updateQueryParams({
            location: "",
            propertyType: "",
            transactionType: "",
            minRent: "",
            maxRent: "",
            minMortgage: "",
            maxMortgage: "",
            sort: "",
            order: "",
            search: "",
            page: "1",
          });
        }}
        onApplyFilters={(newFilters) => {
          setFilters(newFilters);
          updateQueryParams(newFilters);
        }}
      />

      <SortOptions
        searchParams={searchParams}
        onSortChange={handleSortChange}
      />
    </>
  );
};

export default ClientWrapper;
