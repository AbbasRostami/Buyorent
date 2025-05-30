"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import {
  MdCancel,
  MdCompare,
  MdLocationOn,
  MdTitle,
  MdAttachMoney,
  MdStar,
  MdYard,
} from "react-icons/md";
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
import { FaBed, FaBath, FaParking, FaImage } from "react-icons/fa";

const features = [
  {
    key: "photos",
    label: (
      <span className="flex items-center gap-1 ">
        <FaImage className="text-blue-500" /> عکس
      </span>
    ),
    render: (item: any) => (
      <div className="flex justify-center items-center w-full">
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
                loading="lazy"
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
    key: "address",
    label: (
      <span className="flex items-center gap-1  ">
        <MdLocationOn className="text-red-500" /> آدرس
      </span>
    ),
  },
  {
    key: "price",
    label: (
      <span className="flex items-center gap-1   ">
        <MdAttachMoney className="text-green-600" /> قیمت (تومان)
      </span>
    ),
    render: (item: any) => (
      <span className="     inline-block bg-gradient-to-l from-red-400 to-orange-400 text-white px-4 py-1 rounded-lg font-bold text-lg shadow-sm">
        {Number(item.price).toLocaleString()}
      </span>
    ),
  },
  {
    key: "yard_type",
    label: (
      <span className="flex items-center gap-1 ">
        <MdYard className="text-green-700" /> نوع حیاط
      </span>
    ),
  },
  {
    key: "rooms",
    label: (
      <span className="flex items-center gap-1 ">
        <FaBed className="text-blue-700" /> تعداد اتاق
      </span>
    ),
  },
  {
    key: "parking",
    label: (
      <span className="flex items-center gap-1 ">
        <FaParking className="text-purple-700" /> پارکینگ
      </span>
    ),
  },
  {
    key: "bathrooms",
    label: (
      <span className="flex items-center gap-1 ">
        <FaBath className="text-cyan-700" /> تعداد حمام
      </span>
    ),
  },
  {
    key: "rate",
    label: (
      <span className="flex items-center gap-1 ">
        <MdStar className="text-yellow-500" /> امتیاز
      </span>
    ),
  },
  {
    key: "status",
    label: (
      <span className="flex items-center gap-1 ">
        <MdTitle className="text-gray-700" /> جزئیات
      </span>
    ),
    render: (item: any) => (
      <Link href={`/mortgage-and-house-rent/${item.id}`} className="">
        <Button
          variant="shadow"
          color="warning"
          className="rounded-xl text-gray-800 dark:text-gray-800"
        >
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
            color="success"
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
                      className="py-4 px-4 border-b dark:border-gray-700 bg-gradient-to-r from-[#e0a353] to-[#f9a333] text-gray-800 dark:text-gray-700 text-xl font-bold text-center shadow-md relative"
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
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={`py-4 px-2 border-b-1 border-gray-100/40 border-dashed text-center text-gray-800 dark:text-gray-200 text-lg ${
                        index % 2 === 0
                          ? "bg-[#ebebe9] dark:bg-gray-800/80"
                          : "bg-[#F8F8F8] dark:bg-gray-700/80"
                      }`}
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
