import { Modal, ModalContent, Button } from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { FaModx, FaStar } from "react-icons/fa";
import Image from "next/image";
import {
  MdCarRepair,
  MdOutlineBathroom,
  MdOutlineBed,
  MdOutlineYard,
} from "react-icons/md";
import { HiHashtag } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import ModalReserve from "./ModalPassengers";
import ModalPayments from "./ModalPayments";
import { useDisclosure } from "@heroui/react";
import ModalHistory from "./ModalHistory";
import ModalPassengers from "./ModalPassengers";

interface ModalDetailsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  selectedRow?: any;
}

export default function ModalDetails({
  isOpen,
  onOpenChange,
  selectedRow,
}: ModalDetailsProps) {
  const {
    isOpen: isReserveOpen,
    onOpen: onReserveOpen,
    onOpenChange: onReserveOpenChange,
  } = useDisclosure();
  const {
    isOpen: isPaymentsOpen,
    onOpen: onPaymentsOpen,
    onOpenChange: onPaymentsOpenChange,
  } = useDisclosure();
  const {
    isOpen: isModalHistoryOpen,
    onOpen: onHistoryOpen,
    onOpenChange: onHistoryOpenChange,
  } = useDisclosure();

  const {
    isOpen: isPassengerListOpen,
    onOpen: onPassengerListOpen,
    onOpenChange: onPassengerListOpenChange,
  } = useDisclosure();

  const description =
    "آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.  آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان. آپارتمانی دنج و آرام در قلب شهر، جایی که زندگی روزمره راحت و سبک‌تر است. فضایی مدرن با طراحی منحصربه‌فرد، یادآور خانه‌های دنج و دل‌نشین. محلی برای لحظه‌های خوش، آرامش و شروعی نو در زندگی روزمره‌تان.";
  const tags = ["آپارتمان", "مسکونی", "بالکن", "آپارتمان"];
  const address = "گیلان، رشت، میدان آزادی، جنب چهار راه گیلان، رشت...";

  const price = "۵,۰۰۰,۰۰۰";
  const star = 5;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
        size="4xl"
      >
        <ModalContent>
          {(onClose) => (
            <div className="bg-[#F9F9F9] rounded-2xl p-6 dark:bg-gray-800 ">
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="text-3xl font-black text-right flex items-center gap-2">
                  <FaModx
                    size={32}
                    className="text-amber-500  animate-spin duration-[3000ms]"
                  />
                  {selectedRow?.title || "-"}
                </h2>
                <button
                  className="flex items-center gap-2 border border-red-400 text-red-500 rounded-full px-6 py-2 text-lg font-bold hover:bg-red-50 dark:hover:bg-red-500 dark:text-white transition"
                  onClick={onClose}
                >
                  بستن <IoMdClose size={24} />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-6 ">
                <div className="w-full md:w-1/2  rounded-2xl flex justify-center items-center relative">
                  <span className="flex items-center absolute top-3 right-13 gap-2 bg-gradient-to-l from-indigo-400 to-violet-500 text-white px-4 py-2 rounded-xl text-base font-bold">
                    {star} ستاره <FaStar className="text-yellow-300" />
                  </span>
                  <Image
                    src={selectedRow?.image || ""}
                    alt={selectedRow?.title || ""}
                    width={350}
                    height={300}
                    className=" object-cover rounded-xl shadow"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <p className="text-gray-700 leading-6 text-lg text-right dark:text-amber-50">
                    {description}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center mt-2">
                    <span className="text-gray-400 text-base font-normal flex items-center gap-1 dark:text-amber-100">
                      <HiHashtag size={24} />
                      برچسب ها :
                    </span>
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-amber-600 rounded-xl px-3 py-2 text-lg font-bold bg-white dark:bg-gray-700 dark:text-amber-50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Address & Info */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-white dark:bg-gray-900 rounded-xl p-4">
                <div className="flex-1 text-gray-500 text-base text-center">
                  <span className="font-bold text-color1 dark:text-amber-200 flex items-center gap-1">
                    <FaLocationDot size={24} />
                    آدرس :
                  </span>
                  <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                    {address}
                  </span>
                </div>
                <div className="flex justify-center flex-wrap gap-6 items-center mt-4 md:mt-0">
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdOutlineBed size={24} className="text-amber-500" />
                    <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                      4 خوابه
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdCarRepair size={24} className="text-amber-500" />
                    <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                      1 پارکینگ
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdOutlineBathroom size={24} className="text-amber-500" />
                    <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                      2 حمام
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdOutlineYard size={24} className="text-amber-500" />
                    <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                      حیاط
                    </span>
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6">
                <span className="bg-gray-200 dark:bg-gray-900 px-2 py-2 rounded-xl text-medium md:text-lg  font-bold text-red-600 ml-4">
                  قیمت خرید: {price} ت
                </span>

                <div className="flex  items-center gap-2">
                  <Button
                    className=" bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold px-8 py-3 rounded-xl  transition ease-in-out delay-300  hover:scale-105  duration-300 "
                    size="lg"
                    onPress={onReserveOpen}
                  >
                    مسافر ها
                  </Button>
                  <Button
                    className=" bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold px-8 py-3 rounded-xl  transition ease-in-out delay-300  hover:scale-105  duration-300 "
                    size="lg"
                    onPress={onPaymentsOpen}
                  >
                    پرداختی ها
                  </Button>
                  <Button
                    className=" bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold px-8 py-3 rounded-xl  transition ease-in-out delay-300  hover:scale-105  duration-300 "
                    size="lg"
                    onPress={onHistoryOpen}
                  >
                    تاریخچه تغییرات
                  </Button>
                </div>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
      <ModalReserve
        isOpen={isReserveOpen}
        onOpenChange={onReserveOpenChange}
        selectedRow={selectedRow}
      />
      <ModalPayments
        isOpen={isPaymentsOpen}
        onOpenChange={onPaymentsOpenChange}
        selectedRow={selectedRow}
      />
      <ModalHistory
        isOpen={isModalHistoryOpen}
        onOpenChange={onHistoryOpenChange}
        selectedRow={selectedRow}
      />

      <ModalPassengers
        isOpen={isPassengerListOpen}
        onOpenChange={onPassengerListOpenChange}
        selectedRow={selectedRow}
      />
    </>
  );
}
