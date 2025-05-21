// app/houses/page.tsx

import { useServerData } from "@/utils/hooks/useServerData";
import HouseTable from "./HouseTable";

export default async function BookingManagementPage() {
  const houses = await useServerData("/houses", "GET");
  console.log(houses);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">لیست اقامتگاه‌ها</h1>
      <HouseTable houses={houses} />
    </main>
  );
}
