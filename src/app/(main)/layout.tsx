import ClientLayout from "@/app/ClientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه اصلی",
  description: "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
  openGraph: {
    title: "صفحه اصلی | BUYORENT",
    description: "سامانه خرید و اجاره املاک با بهترین قیمت‌ها و امکانات. خرید خانه، آپارتمان، ویلا و زمین در سراسر ایران",
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
