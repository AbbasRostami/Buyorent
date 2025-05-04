"use client";

import { useRef, useEffect, useState } from "react";
import Timer from "@/utils/hooks/timer";
import { FaCircle } from "react-icons/fa6";
import {
  IoIosArrowBack,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
} from "react-icons/io";

export default function ReductionHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState<string>();

  useEffect(() => {
    if (!containerRef.current || !buttonsRef.current) return;

    const calculateWidth = () => {
      const total = containerRef.current?.offsetWidth || 0;
      const btns = buttonsRef.current?.offsetWidth || 0;
      const newWidth = total - btns - 16;

      setTextWidth((prev) =>
        prev !== `${newWidth}px` ? `${newWidth}px` : prev
      );
    };

    calculateWidth();

    const resizeObserver = new ResizeObserver(calculateWidth);
    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(buttonsRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={containerRef}>
        <div
          className="hidden lg:flex items-center justify-between rounded-xl px-4"
          style={{ width: textWidth }}
        >
          <div className="flex items-center gap-4 p-4">
            <div className="text-orange-700 md:text-2xl xl:text-3xl flex items-center gap-4">
              <FaCircle size={17} className="text-gray-200 text-[10px]" />
              جشنواره تخفیف بهاره
            </div>
            <p className="bg-Winston text-white px-4 py-1 rounded-full text-base">
              بجنب تا تموم نشده !
            </p>
          </div>
          <div className="text-Winston xl:text-3xl whitespace-nowrap font-bold">
            <Timer />
          </div>
        </div>

        <div
          ref={buttonsRef}
          className="hidden lg:block inverted absolute top-0 left-0 p-2 rounded-br-xl bg-white dark:bg-[#0a192f] border-b-2 border-r-2 border-gray-200"
        >
          <div className="absolute top-0 left-0 w-full h-3 -mt-2 bg-[#FDFDFD] dark:bg-[#0a192f] z-30 rounded-br-xl" />
          <div className="absolute left-0 w-4 h-full -ml-2 bg-[#FDFDFD] dark:bg-[#0a192f] z-30 rounded-br-xl" />
          <div className="flex items-center gap-4">
            <button className="custom-prev-off dark:bg-gray-900 w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 shadow-md hover:bg-gray-300 hover:text-white transition">
              <IoIosArrowRoundForward className="dark:text-white" />
            </button>
            <button className="custom-next-off dark:bg-gray-900 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 shadow-md hover:bg-gray-300 hover:text-white transition">
              <IoIosArrowRoundBack className="dark:text-white" />
            </button>
            <button className="flex items-center shadow justify-center dark:bg-gray-900 px-4 py-2 text-lg font-semibold text-gray-400 hover:text-white border border-gray-100 rounded-lg bg-white hover:bg-gray-300 transition">
              مشاهده همه
              <IoIosArrowBack className="text-lg mr-1" />
            </button>
          </div>
        </div>

        <div className="flex lg:hidden flex-col sm:flex-row items-center justify-between p-2">
          <div className="text-orange-700 text-3xl flex items-center gap-4">
            <FaCircle className="text-gray-200 text-[10px]" />
            جشنواره تخفیف بهاره
            <button className="flex items-center text-base justify-center font-semibold text-gray-400">
              مشاهده همه
              <IoIosArrowBack className="text-sm mr-1" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <p className="bg-Winston text-white px-4 py-1 rounded-full text-base">
              بجنب تا تموم نشده !
            </p>
            <p className="text-Winston xl:text-3xl whitespace-nowrap font-bold text-center">
              <Timer />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
