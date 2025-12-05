import ClientLayout from "@/app/ClientLayout";
import { Metadata } from "next";
import { LoadingProvider } from "@/utils/providers/LoadingProvider";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://buyorent.vercel.app";
const siteName = "BUYORENT";
const siteDescription =
  "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران";
const ogImage = `${siteUrl}/BUTORENT.png`;

export const metadata: Metadata = {
  title: {
    default: `${siteName} | خرید و اجاره املاک`,
    template: "%s | BUYORENT",
  },
  description: siteDescription,
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
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },

  openGraph: {
    title: `${siteName} | خرید و اجاره املاک`,
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 800,
        height: 600,
        alt: siteName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} | خرید و اجاره املاک`,
    description: siteDescription,
    images: [
      {
        url: ogImage,
        width: 800,
        height: 600,
        alt: siteName,
      },
    ],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
    ],
    apple: [{ url: ogImage, sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "mask-icon", url: ogImage, color: "#FFC107", type: "image/png" },
    ],
  },
  appleWebApp: { title: siteName, statusBarStyle: "default", capable: true },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <ClientLayout>{children}</ClientLayout>
    </LoadingProvider>
  );
}
