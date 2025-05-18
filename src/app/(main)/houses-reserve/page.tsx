import React from "react";
import { useServerData } from "@/utils/hooks/useServerData";
import ClientWrapper from "./ClientWrapper";

export default async function Page() {
  const initialData = await useServerData(
    "/houses?transactionType=",
    "houses",
    60
  );

  return <ClientWrapper initialData={initialData} />;
}
