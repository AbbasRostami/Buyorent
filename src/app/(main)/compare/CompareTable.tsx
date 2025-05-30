"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { MdCancel, MdCompare, MdLocationOn } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import "swiper/css/pagination";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import Link from "next/link";

const features = [
  {
    key: "photos",
    label: "عکس",
    render: (item: any) => (
      <div className="flex justify-center items-center">
        <Swiper
          modules={[Pagination, EffectFade, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          fadeEffect={{ crossFade: true }}
          effect="fade"
          speed={3000}
          spaceBetween={8}
          slidesPerView={1}
          className="w-[380px] h-[200px] rounded-xl"
          pagination={{
            clickable: true,
          }}
        >
          {(item.photos || []).map((photo: string, idx: number) => (
            <SwiperSlide key={idx}>
              <Image
                src={photo}
                alt={item.title}
                unoptimized
                width={380}
                height={200}
                className="rounded-xl object-cover shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ),
  },
  {
    icon: <MdLocationOn size={24} />,
    key: "address",
    label: "آدرس",
  },
  {
    key: "price",
    label: "قیمت (تومان)",
    render: (item: any) => (
      <span className="inline-block bg-gradient-to-l from-yellow-400 to-orange-400 text-white px-4 py-1 rounded-lg font-bold text-lg shadow-sm">
        {Number(item.price).toLocaleString()}
      </span>
    ),
  },
  { key: "yard_type", label: "نوع حیاط" },
  { key: "rooms", label: "تعداد اتاق" },
  { key: "parking", label: "پارکینگ" },
  { key: "bathrooms", label: "تعداد حمام" },
  { key: "rate", label: "امتیاز" },
  {
    key: "status",
    label: "جزئیات",
    render: (item: any) => (
      <Link href={`/mortgage-and-house-rent/${item.id}`} className="">
        <Button variant="flat" color="warning" className="rounded-xl">
          مشاهده جزئیات
        </Button>
      </Link>
    ),
  },
];

interface CompareTableProps {
  selectedHouses: any[];
  ids: string[];
  onOpenModal: () => void;
}

const CompareTable = ({
  selectedHouses,
  ids,
  onOpenModal,
}: CompareTableProps) => {
  const router = useRouter();

  const allColumns = selectedHouses;
  const tableData = features.map((feature) => {
    const row: Record<string, any> = { feature: feature.label };
    allColumns.forEach((item, idx) => {
      row[`col${idx}`] = feature.render
        ? feature.render(item)
        : item[feature.key];
    });
    return row;
  });

  const columns = [
    {
      accessorKey: "feature",
      header: "عنوان",
      cell: (info: any) => info.getValue(),
    },
    ...allColumns.map((item, idx) => ({
      accessorKey: `col${idx}`,
      header: () => (
        <div className="relative flex items-center justify-center">
          {idx === 0 ? (
            <span>{item.title}</span>
          ) : (
            <>
              <button
                onClick={() => {
                  const newIds = ids.filter(
                    (idVal) => idVal !== String(item.id)
                  );
                  router.replace(`?id=${newIds.join(",")}`, { scroll: false });
                }}
                className="absolute right-0 top-0 text-gray-400 hover:text-red-500 text-lg font-bold z-10"
                title="حذف از مقایسه"
              >
                <MdCancel size={24} className="text-red-500" />
              </button>
              <span>{item.title}</span>
            </>
          )}
        </div>
      ),
      cell: (info: any) => info.getValue(),
    })),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex: false,
  });

  return (
    <div className="flex justify-center items-center mt-24 min-h-[70vh] py-10">
      <div className="w-full mx-auto px-7">
        <div className="flex flex-col justify-center items-center gap-6 mb-7 font-extrabold text-center">
          <div className="flex justify-center items-center gap-2">
            <MdCompare size={32} className="text-green-600" />
            <span className="text-4xl text-gray-800 dark:text-gray-200">
              مقایسه املاک
            </span>
          </div>

          <p className="text-center text-gray-500 dark:text-gray-300">
            با این جدول می‌توانید از بین املاکی که انتخاب کردید، انتخاب کنید و
            مقایسه کنید.
          </p>
        </div>
        <div className="flex justify-end mb-4">
          <Button
            onPress={onOpenModal}
            color="warning"
            variant="shadow"
            className="rounded-xl"
          >
            <IoGitCompareOutline size={24} />
            انتخاب جدید برای مقایسه
          </Button>
        </div>
        <div className="overflow-x-auto w-full rounded-xl shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <table className="w-full rounded-xl overflow-hidden">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-4 px-4 border-b dark:border-gray-700 bg-gradient-to-l from-orange-400 to-yellow-300 text-white text-xl font-bold text-center shadow-md relative"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-4 px-2 border-b border-gray-100 text-center text-gray-800 dark:text-gray-200 text-lg"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareTable;
