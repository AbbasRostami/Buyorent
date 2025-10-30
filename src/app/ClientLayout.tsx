"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const noFooterRoutes = ["/login", "/register", "/houses-reserve"];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    setShowFooter(!noFooterRoutes.includes(pathname));
  }, [pathname]);

  return (
    <>
      <Header />
      <Toaster position="top-center" />

      {children}
      {showFooter && <Footer />}
    </>
  );
}
