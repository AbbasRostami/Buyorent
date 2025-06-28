"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaPhoneVolume, FaHashtag } from "react-icons/fa";
import image from "../../assets/Avatar2.png";
import moment from "moment-jalaali";
import { HouseDetailsData } from "@/types/DetailsTypes";
import { NearbyPOIs } from "./NearbyPOIs";
import { MotionDiv, MotionP } from "../../utils/providers/MotionWrapper";
import { Input } from "@heroui/react";
import PersianDatePicker from "../common/PersianDatePicker";
import { BookingModal } from "./BookingModal";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const bookingFormSchema = Yup.object()
  .shape({
    checkInDate: Yup.string().required("تاریخ ورود الزامی است"),
    checkOutDate: Yup.string().required("تاریخ خروج الزامی است"),
    travelerCount: Yup.number()
      .min(1, "حداقل 1 نفر")
      .max(10, "حداکثر 10 نفر")
      .required("تعداد نفرات الزامی است"),
  })
  .test(
    "check-dates",
    "تاریخ ورود باید قبل از تاریخ خروج باشد",
    function (value) {
      if (!value.checkInDate || !value.checkOutDate) return true;

      const checkIn = moment(value.checkInDate, "YYYY/MM/DD");
      const checkOut = moment(value.checkOutDate, "YYYY/MM/DD");

      return checkIn.isBefore(checkOut);
    }
  );

const DetailsLists = ({ data }: { data: HouseDetailsData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    checkInDate: "",
    checkOutDate: "",
    travelerCount: 1,
  });

  const initialValues = {
    checkInDate: "",
    checkOutDate: "",
    travelerCount: 1,
  };

  // محاسبه قیمت داینامیک بر اساس تعداد نفرات
  const calculatePrices = (travelerCount: number) => {
    const basePrice = parseInt(data.price.replace(/,/g, "")) || 1500000;
    const originalPriceValue = basePrice * 1.33; // 33% تخفیف
    const discountedPrice = basePrice;

    setOriginalPrice(originalPriceValue * travelerCount);
    setTotalPrice(discountedPrice * travelerCount);
  };

  // تولید تاریخ‌های رزرو شده
  const generateReservedDates = (
    checkInDate: string,
    checkOutDate: string
  ): string[] => {
    if (!checkInDate || !checkOutDate) return [];

    // بررسی اعتبار تاریخ‌ها
    const startDate = moment(checkInDate, "YYYY/MM/DD");
    const endDate = moment(checkOutDate, "YYYY/MM/DD");

    console.log("startDate", startDate);
    console.log("endDate", endDate);

    if (!startDate.isValid() || !endDate.isValid()) {
      console.error("Invalid dates:", checkInDate, checkOutDate);
      return [];
    }

    // فقط تاریخ ورود و خروج را برمی‌گردانیم
    const dates = [checkInDate, checkOutDate];

    console.log("dates", dates);

    return dates;
  };

  const handleBookingClick = (values: any) => {
    if (
      !values.checkInDate ||
      !values.checkOutDate ||
      values.travelerCount < 1
    ) {
      toast.error("لطفا تاریخ ورود، خروج و تعداد نفرات را مشخص کنید");
      return;
    }
    setFormValues(values);
    setIsModalOpen(true);
  };

  const handleCheckInChange = (date: any, setFieldValue: any) => {
    if (date) {
      // تبدیل تاریخ به فرمت صحیح با استفاده از moment
      const momentDate = moment(
        `${date.year}/${date.month}/${date.day}`,
        "YYYY/M/D"
      );
      const formattedDate = momentDate.format("YYYY/MM/DD");
      setFieldValue("checkInDate", formattedDate);
    }
  };

  const handleCheckOutChange = (date: any, setFieldValue: any, values: any) => {
    if (date) {
      // تبدیل تاریخ به فرمت صحیح با استفاده از moment
      const momentDate = moment(
        `${date.year}/${date.month}/${date.day}`,
        "YYYY/M/D"
      );
      const formattedDate = momentDate.format("YYYY/MM/DD");

      // بررسی اینکه آیا تاریخ ورود انتخاب شده است
      if (values.checkInDate) {
        const checkInDate = moment(values.checkInDate, "YYYY/MM/DD");
        const checkOutDate = moment(formattedDate, "YYYY/MM/DD");

        // اگر تاریخ خروج قبل از تاریخ ورود باشد
        if (checkOutDate.isSameOrBefore(checkInDate)) {
          toast.error("تاریخ خروج باید بعد از تاریخ ورود باشد");
          return; // از تنظیم تاریخ جلوگیری می‌کنیم
        }
      }

      setFieldValue("checkOutDate", formattedDate);
    }
  };

  return (
    <>
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <button className="text-lg font-bold border border-color2 px-4 py-2 rounded-full text-color1">
          امکانات ملک
        </button>
      </MotionDiv>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-[16px] font-medium">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">تعداد خواب</span>
          <span className="text-gray-800 dark:text-gray-100">
            {" "}
            {data.rooms} خواب{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">اجاق گاز</span>
          <span className="text-gray-800 dark:text-gray-100"> دارد </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">بالکن</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">
            سرویس ایرانی
          </span>
          <span className="text-gray-800 dark:text-gray-100">
            {" "}
            {data.bathrooms}{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">نوع نما</span>
          <span className="text-gray-800 dark:text-gray-100">
            {" "}
            {data.categories.name}{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">نوع حیاط</span>
          <span className="text-gray-800 dark:text-gray-100">
            {" "}
            {data.yard_type}{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400"> پارکینگ</span>
          <span className="text-gray-800 dark:text-gray-100">
            {data.parking}{" "}
          </span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">آسانسور</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="flex flex-col pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400">اوپن</span>
          <span className="text-gray-800 dark:text-gray-100">سنگی</span>
        </MotionDiv>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3.0 }}
      >
        <button className="text-xl font-semibold text-[#943600] mt-4 border rounded-full px-4 py-2 dark:text-amber-400">
          قیمت رهن‌واجاره و اطلاعات تماس
        </button>
      </MotionDiv>

      <div className="grid gap-10 items-center sm:grid-cols-2">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
          className="flex flex-col gap-2 pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400 text-xl font-bold">
            قیمت اجاره از
          </span>
          <span className="dark:text-gray-100 font-bold text-2xl text-[#1E1E1E]">
            {data.price}{" "}
            <span className="text-[#595959] font-bold text-sm dark:text-amber-100">
              تومان
            </span>{" "}
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.4 }}
          className="flex flex-col gap-2 pr-3 border-r-3 border-[#d27700]"
        >
          <span className="text-[#d27700] dark:text-amber-400 text-xl font-bold">
            قیمت رهن از
          </span>
          <span className="dark:text-gray-100 font-bold text-2xl text-[#1E1E1E]">
            {data.price}{" "}
            <span className="text-[#595959] font-bold text-sm dark:text-amber-100">
              تومان
            </span>{" "}
          </span>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.6 }}
          className="flex items-center justify-start gap-2"
        >
          <Image
            src={image}
            alt="phone"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {data.sellerName}
            </p>
            <p className="text-medium font-normal">
              {" "}
              {moment(data.last_updated).format("jYYYY/jMM/jDD")}{" "}
            </p>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.8 }}
          className="flex justify-start items-center gap-2"
        >
          <div className="w-[50px] h-[50px] border border-amber-500 dark:border-amber-300 flex justify-center items-center rounded-full">
            <FaPhoneVolume
              className="text-gray-800 dark:text-amber-100"
              size={20}
            />
          </div>

          <div className="bg-color1 dark:bg-gray-700 rounded-full px-6 py-3 text-white font-bold text-medium">
            شماره تماس : 5642***0938
          </div>
        </MotionDiv>

        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.0 }}
          className="flex items-center gap-1 text-medium font-semibold text-gray-500 dark:text-gray-100"
        >
          <FaHashtag />
          برچسب ها:
          {data.tags?.[0] && (
            <span className="text-medium font-semibold text-color2">
              #{data.tags[0]}
            </span>
          )}
          {data.tags?.[1] && (
            <span className="text-medium font-semibold text-color2">
              #{data.tags[1]}
            </span>
          )}
        </MotionP>
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4.2 }}
        className="mt-8"
      >
        <NearbyPOIs address={data.address} />
      </MotionDiv>

      <button className="text-2xl font-bold text-amber-700 dark:text-amber-400">
        همین حالا رزرو کنید
      </button>

      <Formik
        initialValues={initialValues}
        validationSchema={bookingFormSchema}
        onSubmit={handleBookingClick}
      >
        {({ values, setFieldValue }) => {
          useEffect(() => {
            calculatePrices(values.travelerCount);
          }, [values.travelerCount]);

          return (
            <Form>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* تاریخ ورود */}
                <div className="flex flex-col gap-2">
                  <label className="block text-medium font-semibold mb-1">
                    تاریخ ورود
                  </label>
                  <PersianDatePicker
                    id="checkInDate"
                    required
                    placeholder="انتخاب کنید"
                    onChange={(date) => {
                      handleCheckInChange(date, setFieldValue);
                    }}
                  />
                  <ErrorMessage
                    name="checkInDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* تاریخ خروج */}
                <div className="flex flex-col gap-2">
                  <label className="block text-medium font-semibold mb-1">
                    تاریخ خروج
                  </label>
                  <PersianDatePicker
                    id="checkOutDate"
                    required
                    placeholder="انتخاب کنید"
                    onChange={(date) => {
                      handleCheckOutChange(date, setFieldValue, values);
                    }}
                  />
                  <ErrorMessage
                    name="checkOutDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* تعداد نفرات */}
                <div className="flex flex-col gap-2">
                  <label className="block text-medium font-semibold mb-1">
                    تعداد نفرات
                  </label>
                  <Field
                    as={Input}
                    name="travelerCount"
                    type="number"
                    placeholder="وارد کنید"
                    className="w-full"
                    min={1}
                    max={10}
                  />
                  <ErrorMessage
                    name="travelerCount"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* قیمت */}
                <div className="text-sm flex flex-col justify-end">
                  <p className="text-medium font-semibold text-color2 dark:text-amber-400">
                    مجموع قیمت
                  </p>
                  <div>
                    <span className="line-through text-gray-500">
                      {originalPrice.toLocaleString()} تومان /
                    </span>
                    <span className="text-lg font-bold mr-2">
                      {totalPrice.toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-red-400 to-amber-500 cursor-pointer hover:bg-gradient-to-r hover:from-red-500 hover:to-amber-600 text-white text-xl font-bold py-3 px-3 rounded-lg text-center w-full mt-4"
              >
                همین الان رزرو کن
              </button>
            </Form>
          );
        }}
      </Formik>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        houseId={data?.id}
        reservedDates={generateReservedDates(
          formValues.checkInDate,
          formValues.checkOutDate
        )}
        travelerCount={formValues.travelerCount}
        totalPrice={totalPrice}
      />
    </>
  );
};

export default DetailsLists;
