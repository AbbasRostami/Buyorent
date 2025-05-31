import ClientLayout from "@/app/ClientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BUYORENT | خرید و اجاره املاک",
  description: "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
  openGraph: {
    title: "BUYORENT | خرید و اجاره املاک",
    description: "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
  },
  twitter: {
    title: "BUYORENT | خرید و اجاره املاک",
    description: "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
  },
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
  }
  
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
