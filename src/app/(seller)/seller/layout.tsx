import React from "react";
import DashboardClient from "./DashboardClient";
import { SidebarProvider } from "../context/SidebarContext";

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
