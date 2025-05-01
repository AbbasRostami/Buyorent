"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Toaster } from "react-hot-toast";

const noFooterRoutes = ["/login", "/register", "/houses"];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showFooter = !noFooterRoutes.includes(pathname);

  return (
    <>
      <Header />
      <Toaster position="top-center" />
      {children}
      {showFooter && <Footer />}
    </>
  );
}
