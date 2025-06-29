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
import { FaLocationDot } from "react-icons/fa6";
import { useDisclosure } from "@heroui/react";
import ModalPayments from "./ModalPayments";
import moment from "moment-jalaali";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ModalReserve from "./ModalReserve";
import ModalPassengerList from "./PassengerList";
moment.loadPersian({ dialect: "persian-modern" });

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
    isOpen: isPassengerListOpen,
    onOpen: onPassengerListOpen,
    onOpenChange: onPassengerListOpenChange,
  } = useDisclosure();

  const house = selectedRow?.house;
  const booking = selectedRow;

  const formatDate = (dateString: string) => {
    return moment(dateString).format("jYYYY/jMM/jDD  HH:mm");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed":
        return "تأیید شده";
      case "pending":
        return "در انتظار";
      case "canceled":
        return "لغو شده";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "canceled":
        return "danger";
      default:
        return "default";
    }
  };

  console.log("selectedRow:", selectedRow);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        hideCloseButton
        size="4xl"
        scrollBehavior="inside"
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
                  {house?.title || "نام ملک موجود نیست"}
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
                    {house?.rating || 5} ستاره{" "}
                    <FaStar className="text-yellow-300" />
                  </span>
                  <div className="relative  overflow-hidden rounded-2xl">
                    <Swiper
                      modules={[Autoplay, Pagination, EffectFade]}
                      effect="fade"
                      fadeEffect={{ crossFade: true }}
                      speed={3000}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      pagination={{ clickable: true }}
                      loop={true}
                    >
                      {house?.photos?.map((photo: string, idx: number) => (
                        <SwiperSlide
                          key={idx}
                          className="!flex !justify-center !items-center bg-black/5 dark:bg-black/10"
                        >
                          <Image
                            src={photo}
                            unoptimized
                            alt={`${house.title}-photo-${idx}`}
                            width={400}
                            height={220}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Gradient */}
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/50 to-transparent z-0" />

                    {/* Rate badge */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full bg-orange-600 px-3 py-1.5 text-white shadow-md backdrop-blur-sm">
                      <span className="text-lg">⭐</span>
                      <span className="text-sm font-bold">
                        {house?.rate || "بدون امتیاز"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <p className="text-gray-700 leading-6 text-lg text-right dark:text-amber-50">
                    {house?.caption || "توضیحات ملک موجود نیست"}
                  </p>

                  <div className="bg-white dark:bg-gray-900 rounded-xl p-4 space-y-3">
                    <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400">
                      اطلاعات رزرو
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-600 dark:text-gray-300">
                          شناسه رزرو:
                        </span>
                        <span className="text-gray-800 dark:text-gray-100">
                          {booking?.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-600 dark:text-gray-300">
                          وضعیت:
                        </span>
                        <span
                          className={`px-2 py-1 rounded-lg text-sm font-bold ${
                            getStatusColor(booking?.status) === "success"
                              ? "bg-green-100 text-green-800"
                              : getStatusColor(booking?.status) === "warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {getStatusLabel(booking?.status)}
                        </span>
                      </div>

                      <div className="flex justify-start items-center gap-2">
                        <span className="font-bold text-gray-600 dark:text-gray-300">
                          تاریخ رزرو:
                        </span>
                        <span className="text-gray-800 dark:text-gray-100">
                          {booking?.createdAt
                            ? formatDate(booking?.createdAt)
                            : "-"}
                        </span>
                      </div>

                      <div className="flex justify-start items-center gap-2">
                        <span className="font-bold text-gray-600 dark:text-gray-300">
                          آخرین بروزرسانی:
                        </span>
                        <span className="text-gray-800 dark:text-gray-100">
                          {booking?.updatedAt
                            ? formatDate(booking?.updatedAt)
                            : "-"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-600 dark:text-gray-300">
                          ایمیل:
                        </span>
                        <span className="text-gray-800 dark:text-gray-100">
                          {booking?.sharedEmail || "-"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-600 dark:text-gray-300">
                          موبایل:
                        </span>
                        <span className="text-gray-800 dark:text-gray-100">
                          {booking?.sharedMobile || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mt-8 bg-white dark:bg-gray-900 rounded-xl p-4">
                <div className="flex-1 text-gray-500 text-base text-center">
                  <span className="font-bold text-color1 dark:text-amber-200 flex items-center gap-1">
                    <FaLocationDot size={24} />
                    آدرس :
                  </span>
                  <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                    {house?.address || "آدرس موجود نیست"}
                  </span>
                </div>
                <div className="flex justify-center flex-wrap gap-6 items-center mt-4 md:mt-0">
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdOutlineBed size={24} className="text-amber-500" />
                    <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                      {house?.bedrooms || 0} خوابه
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdCarRepair size={24} className="text-amber-500" />
                    <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                      {house?.parking || 0} پارکینگ
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdOutlineBathroom size={24} className="text-amber-500" />
                    <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                      {house?.bathrooms || 0} حمام
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdOutlineYard size={24} className="text-amber-500" />
                    <span className="text-gray-500 text-base hover:text-amber-500 dark:text-amber-100">
                      {house?.hasYard ? "حیاط" : "بدون حیاط"}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-6">
                <span className="bg-gray-200 dark:bg-gray-900 px-2 py-2 rounded-xl text-medium md:text-lg  font-bold text-red-600 ml-4">
                  قیمت: {house?.price?.toLocaleString() || 0} تومان
                </span>

                <div className="flex  items-center gap-2">
                  <Button
                    className=" bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold px-8 py-3 rounded-xl  transition ease-in-out delay-300  hover:scale-105  duration-300 "
                    size="lg"
                    onPress={onReserveOpen}
                  >
                    رزرو ها
                  </Button>
                  <Button
                    className=" bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold px-8 py-3 rounded-xl  transition ease-in-out delay-300  hover:scale-105  duration-300 "
                    size="lg"
                    onPress={onPaymentsOpen}
                  >
                    پرداختی ها
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
      <ModalPassengerList
        isOpen={isPassengerListOpen}
        onOpenChange={onPassengerListOpenChange}
        selectedRow={selectedRow}
      />
    </>
  );
}
