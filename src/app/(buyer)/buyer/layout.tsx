import React from "react";
import DashboardClient from "./DashboardClient";
import { SidebarProvider } from "../context/SidebarContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل کاربری خریدار",
  description:
    "مدیریت حساب کاربری خریدار در سامانه BUYORENT. مشاهده و مدیریت املاک مورد علاقه، پیام‌ها و درخواست‌های رزرو",
  openGraph: {
    title: "پنل کاربری خریدار | BUYORENT",
    description:
      "مدیریت حساب کاربری خریدار در سامانه BUYORENT. مشاهده و مدیریت املاک مورد علاقه، پیام‌ها و درخواست‌های رزرو",
  },
  twitter: {
    title: "پنل کاربری خریدار | BUYORENT",
    description:
      "مدیریت حساب کاربری خریدار در سامانه BUYORENT. مشاهده و مدیریت املاک مورد علاقه، پیام‌ها و درخواست‌های رزرو",
  },
  authors: [{ name: "BUYORENT" }],
};

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardClient>{children}</DashboardClient>
    </SidebarProvider>
  );
}
