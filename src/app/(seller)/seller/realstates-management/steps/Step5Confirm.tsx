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
import { Pagination,Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

export default function Step5Confirm() {
  const { values } = useFormikContext<any>();
  const images = values.images || [];

  return (
    <div className="bg-[#FBFBFB] rounded-2xl p-4 sm:p-6 mt-4 dark:border-none dark:bg-gray-700 border border-gray-200 shadow-xl">
      <div className="flex flex-col lg:flex-row-reverse gap-4 lg:gap-6 items-stretch">
        {/* ستون راست: اطلاعات متنی */}
        <div className="w-full lg:w-1/2 flex flex-col items-start min-w-0 lg:pr-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-2 w-full">
            عنوان ملک: {values.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-right mb-3 leading-7 text-sm sm:text-base max-h-14 overflow-hidden text-ellipsis whitespace-nowrap md:whitespace-normal md:line-clamp-2">
            {values.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4 w-full">
            <span className="text-gray-400 text-sm sm:text-medium font-normal ml-2">
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
            <div className="flex items-center gap-2 justify-end text-normal font-normal w-full">
              <FaThLarge size={18} className="text-gray-400" />
              <span>حیاط بالکنی</span>
            </div>
            <div className="flex items-center gap-2 justify-end text-normal font-normal w-full">
              <FaHome size={18} className="text-gray-400" />
              <span className="font-bold">{values.estateType}</span>
              <span className="font-bold">{values.subType}</span>
            </div>
            <div className="flex items-start gap-2 justify-end mt-2 text-normal font-normal w-full flex-wrap">
              <FaMoneyBillWave size={18} className="text-gray-400" />
              <span className="text-red-500 font-bold text-base sm:text-lg">
                {Number(values.price).toLocaleString()} ریال
              </span>
              <FaKey size={18} className="text-gray-400" />
              <span className="text-gray-500 font-normal text-xs sm:text-sm">
                رهن، اجاره
              </span>
            </div>
          </div>
        </div>

        {/* ستون چپ: اسلایدر تصاویر */}
        <div className="w-full lg:w-1/2 flex flex-col items-center min-w-0 lg:pl-4 max-w-full lg:max-w-lg">
            <Swiper
              modules={[Pagination,Autoplay, EffectFade]}
              spaceBetween={0}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={2000}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className=" w-full max-h-[230px] rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-800 flex items-center justify-center"
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
            <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
              <FaMapMarkerAlt size={18} className="text-gray-400" />
              <span className="text-sm sm:text-base">{values.address}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-start w-full sm:w-auto text-xs sm:text-sm">
              <div className="flex items-center gap-1">
                <FaBed size={18} className="text-gray-400" />
                <span>{values.roomCount} خواب</span>
              </div>
              <div className="flex items-center gap-1">
                <FaBath size={18} className="text-gray-400" />
                <span>{values.bathCount} حمامه</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCar size={18} className="text-gray-400" />
                <span>{values.parkingCount} پارکینگ</span>
              </div>
              <div className="flex items-center gap-1">
                <FaListUl size={18} className="text-gray-400" />
                <span>ظرفیت {values.capacity} نفر</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
