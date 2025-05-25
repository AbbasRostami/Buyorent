import ClientLayout from "@/app/ClientLayout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
