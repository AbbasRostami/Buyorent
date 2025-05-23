// components/ModalDetails.tsx
import { Modal, ModalContent, Button } from "@heroui/react";
import { BookingData } from "./page";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { LuCopy } from "react-icons/lu";
import Image from "next/image";
import { MdCarRepair, MdOutlineBathroom, MdOutlineBed, MdOutlineYard } from "react-icons/md";

interface ModalDetailsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedRow?: BookingData;
}

export default function ModalDetails({
  isOpen,
  onOpenChange,
  selectedRow,
}: ModalDetailsProps) {
  const description =
    "آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و بی‌دغدغه است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.";
  const tags = ["آپارتمان", "مسکونی", "بالکن", "آپارتمان"];
  const address = "گیلان، رشت، میدان آزادی، جنب چهار راه گیلان، رشت...";

  const price = "۵,۰۰۰,۰۰۰";
  const star = 5;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      hideCloseButton
    >
      <ModalContent className="max-w-4xl ">
        {(onClose) => (
          <div className="bg-[#F9F9F9] rounded-2xl p-6 dark:bg-gray-800 ">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h2 className="text-3xl font-black text-right">
                {selectedRow?.title || "-"}
              </h2>
              <button
                className="flex items-center gap-2 border border-red-400 text-red-500 rounded-full px-6 py-2 text-lg font-bold hover:bg-red-50 transition"
                onClick={onClose}
              >
                بستن <IoMdClose size={24} />
              </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row gap-6 ">
              {/* Image & Info */}
              <div className="w-full md:w-1/2 bg-gray-200 rounded-2xl min-h-[220px] flex flex-col justify-between p-4 relative">
                {/* Copy & Star */}
                <div className="flex justify-between items-start">
                  <button className="bg-lime-300 p-2 rounded-xl">
                    <LuCopy size={22} className="text-lime-700" />
                  </button>
                  <span className="flex items-center gap-2 bg-gradient-to-l from-indigo-400 to-violet-500 text-white px-4 py-2 rounded-xl text-base font-bold">
                    {star} ستاره <FaStar className="text-yellow-300" />
                  </span>
                </div>
                {/* Placeholder for image */}
                <div className="flex-1 flex items-center justify-center">
                  <Image
                    src={selectedRow?.image || ""}
                    alt={selectedRow?.title || ""}
                    width={100}
                    height={100}
                    className=" object-cover rounded-xl shadow"
                  />
                </div>
              </div>

              {/* Description & Tags */}
              <div className="flex-1 space-y-4">
                <p className="text-gray-700 leading-8 text-lg text-right">
                  {description}
                </p>
                <div className="flex flex-wrap gap-2 items-center mt-2">
                  <span className="text-gray-400 text-base">برچسب ها :</span>
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="border border-amber-400 text-amber-600 rounded-xl px-6 py-2 text-lg font-bold bg-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Address & Info */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-white rounded-xl p-4">
              <div className="flex-1 text-gray-500 text-base text-right">
                <span className="font-bold text-color1">آدرس :</span> {address}
              </div>
              <div className="flex flex-wrap gap-6 items-center mt-4 md:mt-0">
                <span className="flex items-center gap-2 text-gray-600">
                  <MdOutlineBed size={24} /> 4 خوابه
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <MdCarRepair size={24} /> 1 پارکینگ
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <MdOutlineBathroom size={24} /> 2 حمام
                </span>
                <span className="flex items-center gap-2 text-gray-600">
                  <MdOutlineYard size={24} /> حیاط
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6">
              <span className="bg-gray-200 px-2 py-2 rounded-xl text-medium md:text-lg  font-bold text-red-600 ml-4">
                قیمت خرید: {price} ت
              </span>

              <div className="flex  items-center gap-2">
                <Button
                  className=" bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold px-8 py-3 rounded-xl  transition ease-in-out delay-300  hover:scale-105  duration-300 "
                  size="lg"
                >
                  رزرو ها
                </Button>
                <Button
                  className=" bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold px-8 py-3 rounded-xl  transition ease-in-out delay-300  hover:scale-105  duration-300 "
                  size="lg"
                >
                  پرداختی ها
                </Button>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
