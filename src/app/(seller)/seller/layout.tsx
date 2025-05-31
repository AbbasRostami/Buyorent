import React from "react";
import DashboardClient from "./DashboardClient";
import { SidebarProvider } from "../context/SidebarContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "پنل کاربری فروشنده",
  description: "مدیریت حساب کاربری فروشنده در سامانه BUYORENT. مدیریت املاک، پیام‌ها و درخواست‌های رزرو",
  openGraph: {
    title: "پنل کاربری فروشنده | BUYORENT",
    description: "مدیریت حساب کاربری فروشنده در سامانه BUYORENT. مدیریت املاک، پیام‌ها و درخواست‌های رزرو",
  },
};

export default function SellerLayout({
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
