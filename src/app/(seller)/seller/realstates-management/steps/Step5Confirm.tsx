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
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Step5Confirm() {
  const { values } = useFormikContext<any>();
  const images = values.images || [];

  return (
    <div className="bg-[#FBFBFB] rounded-2xl p-6 mt-4 dark:border-none dark:bg-gray-700 border border-gray-200 shadow-xl">
      <div className="flex flex-col md:flex-row-reverse gap-6 items-stretch">
        {/* ستون راست: اطلاعات متنی */}
        <div className="flex-1 flex flex-col min-w-0 md:pr-4">
          <h2 className="text-2xl font-bold text-center mb-2">
            {values.title}
          </h2>
          <p className="text-gray-700 text-right mb-3 leading-7 max-h-14 overflow-hidden text-ellipsis whitespace-nowrap md:whitespace-normal md:line-clamp-2">
            {values.description}
          </p>
          <div className="flex flex-row-reverse items-center justify-center gap-2 mb-4">
            <span className="text-gray-400 text-sm ml-2">برچسب ها :</span>
            {values.tags?.map((tag: string) => (
              <span
                key={tag}
                className="bg-lime-400 text-white rounded-full px-4 py-1 text-sm font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm mt-auto text-right">
            <div className="flex items-center gap-2 justify-end">
              <FaMapMarkerAlt className="text-gray-400" />
              <span>{values.address}</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <FaBed className="text-gray-400" />
              <span>{values.roomCount} خواب</span>
              <FaBath className="text-gray-400" />
              <span>{values.bathCount} حمامه</span>
              <FaCar className="text-gray-400" />
              <span>{values.parkingCount} پارکینگ</span>
              <FaListUl className="text-gray-400" />
              <span>ظرفیت {values.capacity} نفر</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <FaThLarge className="text-gray-400" />
              <span>حیاط بالکنی</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
              <FaHome className="text-gray-400" />
              <span className="font-bold">{values.estateType}</span>
              <span className="font-bold">{values.subType}</span>
            </div>
            <div className="flex items-center gap-2 justify-end mt-2">
              <FaMoneyBillWave className="text-gray-400" />
              <span className="text-lime-500 font-bold text-lg">
                {Number(values.price).toLocaleString()} ریال
              </span>
              <FaKey className="text-gray-400" />
              <span className="text-gray-500">رهن، اجاره</span>
            </div>
          </div>
        </div>
        {/* ستون چپ: اسلایدر تصاویر */}
        <div className="flex-1 flex flex-col items-center min-w-0 md:pl-4">
          <div className="w-full max-w-xs">
            <Swiper
              modules={[Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              className="w-full h-56 rounded-xl overflow-hidden border-2 border-gray-200 bg-gray-800 flex items-center justify-center"
            >
              {images.length > 0 ? (
                images.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`img${index}`}
                      className="object-cover w-full h-full"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
                    ?
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            <div className="text-center text-xs text-gray-500 mt-2">
              تصاویر ملک
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
