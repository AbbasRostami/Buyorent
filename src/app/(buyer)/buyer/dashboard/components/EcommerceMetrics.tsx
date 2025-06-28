"use client";
import Image from "next/image";
import introImg from "./../../../../../assets/introImg.svg";
import { Skeleton } from "@heroui/react";
import { useProfile } from "@/services/Profile/getProfile";

export default function EcommerceMetrics() {
  const { user, isLoading, error } = useProfile();

  if (error) return <div>خطا در بارگذاری اطلاعات: {error.message}</div>;

  return (
    <div className="flex flex-col rtl h-full w-full items-center shadow-xl bg-white border border-gray-200 dark:hover:bg-gray-700/80 transition-all duration-300 rounded-2xl md:flex-col hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
      <Image
        className="object-cover w-full rounded-t-lg h-65 md:h-auto md:w-50 md:rounded-none md:rounded-s-lg"
        src={introImg}
        alt="خوش آمدید"
      />
      <div className="flex flex-col justify-between p-4 leading-normal w-full">
        {isLoading ? (
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-6 w-48 rounded-md mb-3"
          />
        ) : (
          <p className="mb-3 text-2xl font-extrabold tracking-wide text-gray-900 dark:text-white">
            سلام {user?.user?.firstName} عزیز 👋
          </p>
        )}

        {isLoading ? (
          <>
            <Skeleton
              classNames={{
                base: "animate-pulse bg-gray-200 dark:bg-gray-700",
              }}
              className="h-4 w-full mb-2 rounded-md"
            />
            <Skeleton className="h-4 w-4/5 mb-2 rounded-md" />
            <Skeleton className="h-4 w-3/4 mb-2 rounded-md" />
          </>
        ) : (
          <p className="mb-4 text-md font-medium text-gray-700 leading-relaxed dark:text-gray-400">
            از دیدن شما در پنل کاربری‌مون خوشحالیم! 🎉{" "}
            <span className="font-semibold text-color1">
              با تکمیل پروفایل‌تون
            </span>
            ، تجربه‌ای کامل‌تر و حرفه‌ای‌تر از خدمات ما خواهید داشت. با ما همراه
            باشید و از امکانات ویژه بهره‌مند شوید. 🚀
          </p>
        )}
      </div>
    </div>
  );
}
