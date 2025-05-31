import { Metadata } from "next";
import { defaultMetadata } from "./index";
import { SearchParams } from "@/types/search";
import qs from "qs";

const transactionTypes: Record<string, string> = {
  mortgage: "رهن",
  rental: "اجاره",
  reservation: "رزرو",
  direct_purchase: "خرید مستقیم",
};

export const generateMortgageAndRentMetadata = (
  searchParams: SearchParams
): Metadata => {
  const titleParts: string[] = ["رهن و اجاره"];

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

  const descriptionParts: string[] = ["رهن و اجاره آپارتمان"];

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

  const queryString = qs.stringify(searchParams, {
    encode: false,
  });

  const url = `/mortgage-and-house-rent${queryString ? `?${queryString}` : ""}`;

  return {
    ...defaultMetadata,
    title,
    description,
    keywords: [
      "رهن و اجاره",
      "رهن و اجاره آپارتمان",
      "اجاره آپارتمان",
      "رهن آپارتمان",
      "آپارتمان اجاره",
      "آپارتمان رهن",
      "املاک رهن و اجاره",
      searchParams.transactionType
        ? transactionTypes[searchParams.transactionType]
        : "",
      searchParams.search ? `رهن و اجاره ${searchParams.search}` : "",
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

export const generateMortgageAndRentDetailMetadata = (data: any): Metadata => ({
  ...defaultMetadata,
  title: `${data?.title} | BUYORENT`,
  description: `${data?.title} در ${data?.address}. ${
    data?.caption || "آپارتمان برای رهن و اجاره با بهترین قیمت و امکانات"
  }`,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: `${data?.title} | BUYORENT`,
    description: `${data?.title} در ${data?.address}. ${
      data?.caption || "آپارتمان برای رهن و اجاره با بهترین قیمت و امکانات"
    }`,
    images: data?.photos ? [data?.photos[0]] : [],
  },
  alternates: {
    canonical: `/mortgage-and-house-rent/${data?.id}`,
  },
});
