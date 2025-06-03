"use client";
import { useState } from "react";
import AnnouncementsTable from "./AnnouncementsTable";

export interface Announcement {
  id: number;
  title: string;
  date: string;
  isRead: boolean;
}

export default function AnnouncementsPage() {
  const [data, setData] = useState<Announcement[]>([]);

  const initialData: Announcement[] = [
    {
      id: 1,
      title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
      date: "12 مرداد / 1401 – 13:33",
      isRead: false,
    },
    {
      id: 2,
      title: "به سایت دلتـا خوش آمدید",
      date: "04 مرداد / 1401 – 13:33",
      isRead: false,
    },
    {
      id: 3,
      title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
      date: "08 مرداد / 1401 – 13:33",
      isRead: true,
    },
    {
      id: 4,
      title: "به سایت دلتـا خوش آمدید",
      date: "07 مرداد / 1401 – 13:33",
      isRead: true,
    },
    {
      id: 5,
      title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
      date: "10 مرداد / 1401 – 13:33",
      isRead: false,
    },
    {
      id: 6,
      title: "به سایت دلتـا خوش آمدید",
      date: "22 مرداد / 1401 – 13:33",
      isRead: true,
    },
    {
      id: 7,
      title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
      date: "30 مرداد / 1401 – 13:33",
      isRead: false,
    },
    {
      id: 8,
      title: "به سایت دلتـا خوش آمدید",
      date: "13 مرداد / 1401 – 13:33",
      isRead: true,
    },
    {
      id: 9,
      title: "فروشنده امیر محمد ملایی یک خانه برای رزرو آگهی کرده است",
      date: "28 مرداد / 1401 – 13:33",
      isRead: false,
    },
    {
      id: 10,
      title: "به سایت دلتـا خوش آمدید",
      date: "19 مرداد / 1401 – 13:33",
      isRead: true,
    },
  ];
  return <AnnouncementsTable data={initialData} setData={setData} />;
}
