import ClientLayout from "@/app/ClientLayout";

import { LoadingProvider } from "@/utils/providers/LoadingProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingProvider>
      <ClientLayout>{children}</ClientLayout>
    </LoadingProvider>
  );
}
