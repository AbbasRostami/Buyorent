"use client";
import {
  BsInstagram,
  BsPersonCircle,
  BsTelegram,
  BsTwitterX,
} from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { useRef } from "react";
import Image from "next/image";
import profile from "./../../../../../assets/Avatar2.png";
import { useProfile } from "@/services/Profile/getProfile";
import { Skeleton } from "@heroui/react";
export default function UserMetaCard() {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fallbackRef = useRef<HTMLDivElement | null>(null);
  const { user, isLoading, error } = useProfile();
  if (isLoading)
    return (
      <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
        <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
          <Skeleton className="w-full h-full rounded-full" />
        </div>

        <div className="order-3 xl:order-2 flex flex-col items-center xl:items-start gap-2">
          <Skeleton className="h-5 w-32 rounded-md" />
          <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
            <Skeleton className="h-4 w-28 rounded-md" />
            <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block" />
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
        </div>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <div className="p-5 border rtl border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              {user?.user?.profilePicture &&
              user?.user?.profilePicture !== "Not-set" ? (
                <>
                  <Image
                    ref={imgRef}
                    src={user?.user?.profilePicture || profile}
                    width={100}
                    height={100}
                    alt="Profile Picture"
                    className="rounded-full w-20 h-20 border-2 object-cover"
                    onError={() => {
                      imgRef.current?.classList.add("hidden");
                      fallbackRef.current?.classList.remove("hidden");
                    }}
                  />
                </>
              ) : (
                <BsPersonCircle className="rounded-full w-full h-full text-gray-400 dark:text-gray-600" />
              )}
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2  text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-center">
                {user?.user?.firstName} {user?.user?.lastName}
              </h4>
              <div className="flex flex-col items-center rtl gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  شناسه کاربری: {user?.user?.id}
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  نقش: {user?.user?.role === "buyer" ? "خریدار" : "فروشنده"}
                </p>
              </div>
            </div>
            <div className="flex items-center order-2 gap-2 grow xl:order-3 xl:justify-end">
              <a
                href="#"
                target="_blank"
                rel="noopener"
                className="flex h-11 w-11 items-center justify-center gap-2 cursor-pointer rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <BsTelegram />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <BsTwitterX />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener"
                className="flex h-11 w-11 items-center justify-center cursor-pointer gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener"
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                <BsInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
