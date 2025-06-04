import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/utils/providers/providers";
import { Providers } from "@/utils/providers/ProvidersHeroUi";
import localFont from "next/font/local";
import { Metadata } from "next";
import "./globals.css";
import { auth } from "@/services/auth";
import image from "./../assets/BUTORENT.png";

const vazirmatn = localFont({
  src: "./../assets/fonts/Vazirmatn.ttf",
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
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
        url: image.src,
        width: 1200,
        height: 630,
        alt: "BUYORENT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BUYORENT | خرید و اجاره املاک",
    description:
      "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
    images: [
      {
        url: image.src,
        width: 1200,
        height: 630,
        alt: "BUYORENT",
      },
    ],
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <SessionProvider session={session}>
          <QueryProvider>
            <Providers>{children}</Providers>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
