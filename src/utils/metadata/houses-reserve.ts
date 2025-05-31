import { Metadata } from "next";
import { defaultMetadata } from "./index";

interface SearchParams {
  minPrice?: string;
  maxPrice?: string;
  sort?: "rate" | "price";
  order?: "asc" | "desc";
  transactionType?: "mortgage" | "rental" | "reservation" | "direct_purchase";
  search?: string;
}

const transactionTypes: Record<string, string> = {
  mortgage: "رهن",
  rental: "اجاره",
  reservation: "رزرو",
  direct_purchase: "خرید مستقیم",
};

export const generateHousesReserveMetadata = (
  searchParams: SearchParams
): Metadata => {
  const titleParts: string[] = ["رزرو سریع"];

  if (searchParams.transactionType) {
    titleParts.push(
      transactionTypes[searchParams.transactionType] ||
        searchParams.transactionType
    );
  }

  if (searchParams.search) {
    titleParts.push(`"${searchParams.search}"`);
  }

  const title = `${titleParts.join(" ")} | BUYORENT`;

  const descriptionParts: string[] = ["رزرو سریع و آسان"];

  if (searchParams.transactionType) {
    descriptionParts.push(
      transactionTypes[searchParams.transactionType] ||
        searchParams.transactionType
    );
  }

  if (searchParams.search) {
    descriptionParts.push(`"${searchParams.search}"`);
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    const priceRange = [];
    if (searchParams.minPrice)
      priceRange.push(
        `از ${Number(searchParams.minPrice).toLocaleString()} تومان`
      );
    if (searchParams.maxPrice)
      priceRange.push(
        `تا ${Number(searchParams.maxPrice).toLocaleString()} تومان`
      );
    descriptionParts.push(`با قیمت ${priceRange.join(" ")}`);
  }

  const description = `${descriptionParts.join(" ")} با بهترین قیمت و امکانات`;

  const searchParamsString = new URLSearchParams(
    Object.entries(searchParams).filter(([_, value]) => value)
  ).toString();

  const url = `/houses-reserve${
    searchParamsString ? `?${searchParamsString}` : ""
  }`;

  return {
    ...defaultMetadata,
    title,
    description,
    keywords: [
      "رزرو آپارتمان",
      "رزرو سریع",
      "رزرو آنلاین",
      "آپارتمان رزرو",
      "رزرو خانه",
      "رزرو ویلا",
      "املاک رزرو",
      searchParams.transactionType
        ? transactionTypes[searchParams.transactionType]
        : "",
      searchParams.search ? `رزرو ${searchParams.search}` : "",
    ].filter(Boolean),
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
};
