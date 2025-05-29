import { useFormikContext } from "formik";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaCar,
  FaHome,
  FaMoneyBillWave,
  FaListUl,
  FaThLarge,
  FaKey,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { MdAddHomeWork } from "react-icons/md";
import { LuTags } from "react-icons/lu";

export default function Step5Confirm() {
  const { values } = useFormikContext<any>();
  const images = values.images || [];

  return (
    <div className="bg-[#FBFBFB] rounded-2xl p-4 sm:p-6 mt-4 dark:border-none dark:bg-gray-700 border border-gray-200 shadow-xl">
      <div className="flex flex-col lg:flex-row-reverse gap-4 lg:gap-6 items-stretch">
        {/* ستون راست: اطلاعات متنی */}
        <div className="w-full lg:w-1/2 flex flex-col items-start min-w-0 lg:pr-4">
          <h2 className="text-xl flex items-center gap-2 sm:text-2xl text-amber-300 font-semibold text-center mb-2 w-full ">
            <MdAddHomeWork className="text-amber-200" />
            عنوان ملک: {values.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-justify mb-3 text-sm sm:text-base line-clamp-none">
            {values.description}
          </p>
          <div className="flex flex-wrap items-center justify-start gap-2 mb-4 w-full">
            <span className=" flex items-center gap-2 text-amber-200 text-sm sm:text-medium font-normal ml-2">
              <LuTags />
              برچسب ها :
            </span>
            {Array.isArray(values.tags) &&
              values.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-amber-400 text-gray-800 rounded-full px-3 py-1 text-xs sm:text-sm font-bold"
                >
                  {tag}
                </span>
              ))}
          </div>

          <div className="flex flex-col gap-2 text-xs sm:text-sm mt-auto items-start w-full">
            <div className="flex items-center gap-2 justify-start text-normal font-normal w-full">
              <FaThLarge size={18} className="text-amber-200" />
              <span className="text-medium font-bold">حیاط بالکنی</span>
            </div>
            <div className="flex items-center gap-2 justify-start text-normal font-normal w-full">
              <FaHome size={18} className="text-amber-200" />
              <span className="font-bold text-medium">{values.estateType}</span>
              <span className="font-bold text-medium">{values.subType}</span>
            </div>
            <div className="flex items-center gap-2 justify-evenly  md:justify-start mt-2 text-normal font-normal w-full flex-wrap">
              <span className="flex items-center gap-2 text-amber-200 font-normal text-xs sm:text-sm">
              <FaMoneyBillWave size={18} className="text-amber-200" />
              <span className="text-red-400 font-bold text-base sm:text-lg">
                {Number(values.price).toLocaleString()} ریال
              </span>
              </span>
              <span className="flex items-center gap-2 text-amber-200 font-normal text-xs sm:text-sm">
              <FaKey size={18} className="text-amber-200" />
                رهن، اجاره
              </span>
            </div>
          </div>
        </div>

        {/* ستون چپ: اسلایدر تصاویر */}
        <div className="w-full lg:w-1/2 flex flex-col items-center min-w-0 lg:pl-4 max-w-full lg:max-w-lg">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            spaceBetween={0}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={2000}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className=" w-full max-h-[230px] rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center"
          >
            {images.length > 0 ? (
              images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <Image
                    width={450}
                    height={230}
                    src={image}
                    alt={`img${index}`}
                    className="object-cover w-full h-full"
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-[200px] sm:h-[300px] md:h-[400px] flex items-center justify-center text-gray-400 text-4xl">
                  ?
                </div>
              </SwiperSlide>
            )}
          </Swiper>

          <div className="flex flex-wrap items-center gap-2 justify-start w-full mt-4">
            <div className="flex items-center gap-2 justify-start w-full sm:w-auto">
              <FaMapMarkerAlt size={18} className="text-amber-200" />
              <span className="text-sm sm:text-base">{values.address}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-start w-full sm:w-auto text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <FaBed size={18} className="text-amber-200" />
                <span>{values.roomCount} خواب</span>
              </div>
              <div className="flex items-center gap-1">
                <FaBath size={18} className="text-amber-200" />
                <span>{values.bathCount} حمامه</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCar size={18} className="text-amber-200" />
                <span>{values.parkingCount} پارکینگ</span>
              </div>
              <div className="flex items-center gap-1">
                <FaListUl size={18} className="text-amber-200" />
                <span>ظرفیت {values.capacity} نفر</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
