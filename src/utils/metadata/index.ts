import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "BUYORENT | خرید و اجاره املاک",
    template: "%s | BUYORENT",
  },
  description:
    "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
  keywords: [
    "خرید خانه",
    "اجاره خانه",
    "خرید آپارتمان",
    "اجاره آپارتمان",
    "خرید ویلا",
    "اجاره ویلا",
    "خرید زمین",
    "املاک",
    "BUYORENT",
  ],
  authors: [{ name: "BUYORENT" }],
  creator: "BUYORENT",
  publisher: "BUYORENT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://buyorent.ir"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BUYORENT | خرید و اجاره املاک",
    description:
      "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
    url: "https://buyorent.ir",
    siteName: "BUYORENT",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "./../../assets/BUTORENT.png",
        width: 800,
        height: 600,
        alt: "BUYORENT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BUYORENT | خرید و اجاره املاک",
    description:
      "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
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
  verification: {
    google: "google-site-verification-code",
  },
};
