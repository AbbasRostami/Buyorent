import React from "react";
import { SidebarProvider } from "./SidebarContext";
import DashboardClient from "./DashboardClient";

export default function AdminLayout({
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
