import { Metadata } from "next";
import { defaultMetadata } from "./index";

export const mortgageAndRentMetadata: Metadata = {
  ...defaultMetadata,
  title: "رهن و اجاره آپارتمان | BUYORENT",
  description:
    "جستجوی آپارتمان برای رهن و اجاره در سراسر ایران. فیلتر بر اساس قیمت، متراژ، تعداد خواب و امکانات. مشاهده آپارتمان‌های رهن و اجاره با بهترین قیمت",
  keywords: [
    "رهن و اجاره",
    "رهن و اجاره آپارتمان",
    "اجاره آپارتمان",
    "رهن آپارتمان",
    "آپارتمان اجاره",
    "آپارتمان رهن",
    "املاک رهن و اجاره",
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "رهن و اجاره آپارتمان | BUYORENT",
    description:
      "جستجوی آپارتمان برای رهن و اجاره در سراسر ایران. فیلتر بر اساس قیمت، متراژ، تعداد خواب و امکانات",
    url: "/mortgage-and-house-rent",
  },
  alternates: {
    canonical: "/mortgage-and-house-rent",
  },
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
