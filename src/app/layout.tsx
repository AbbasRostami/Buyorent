import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/utils/providers/providers";
import { Providers } from "@/utils/providers/ProvidersHeroUi";
import localFont from "next/font/local";
import "./globals.css";
import { auth } from "@/services/auth";
import ClientLayout from "./ClientLayout";

const vazirmatn = localFont({
  src: "./../assets/fonts/Vazirmatn.ttf",
  variable: "--font-vazirmatn",
  display: "swap",
});

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
            <Providers>
              <ClientLayout>{children}</ClientLayout>
            </Providers>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
