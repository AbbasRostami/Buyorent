import { Input } from "@heroui/react";
import React from "react";

const DetailsListsReserve = () => {
  return (
    <>
      <button className="text-lg font-bold border border-color2 px-4 py-2 rounded-full  text-color1">
        امکانات هتل
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-[16px] font-medium">
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">تعداد خواب</span>
          <span className="text-gray-800 dark:text-gray-100">۴ خواب</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">اجاق گاز</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">بالکن</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">
            سرویس ایرانی
          </span>
          <span className="text-gray-800 dark:text-gray-100">کوار</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">نوع نما</span>
          <span className="text-gray-800 dark:text-gray-100">رومی</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">نوع سازه</span>
          <span className="text-gray-800 dark:text-gray-100">نوساز</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">پارکینگ</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">آسانسور</span>
          <span className="text-gray-800 dark:text-gray-100">دارد</span>
        </div>
        <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
          <span className="text-[#d27700] dark:text-amber-400">اوپن</span>
          <span className="text-gray-800 dark:text-gray-100">سنگی</span>
        </div>
      </div>

      <button className="text-2xl font-bold text-amber-700 dark:text-amber-400">
        همین حالا رزرو کنید
      </button>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* تاریخ ورود */}
        <div>
          <label className="block text-medium font-semibold mb-1">
            تاریخ ورود
          </label>
          <Input isRequired placeholder="انتخاب کنید" className="w-full" />
        </div>

        {/* تاریخ خروج */}
        <div>
          <label className="block text-medium font-semibold mb-1">
            تاریخ خروج
          </label>
          <Input isRequired placeholder="انتخاب کنید" className="w-full" />
        </div>

        {/* تعداد نفرات */}
        <div>
          <label className="block text-medium font-semibold mb-1">
            تعداد نفرات
          </label>
          <Input
            isRequired
            type="number"
            placeholder="وارد کنید"
            className="w-full"
          />
        </div>

        {/* قیمت */}
        <div className="text-sm flex flex-col justify-end">
          <p className="text-medium font-semibold text-color2 dark:text-amber-400">
            مجموع قیمت
          </p>
          <div>
            <span className="line-through text-gray-500">
              ۲٬۰۰۰٬۰۰۰ تومان /
            </span>
            <span className="text-lg font-bold mr-2">۱٬۵۰۰٬۰۰۰ تومان</span>
          </div>
        </div>
      </div>

      <button className="bg-color1 cursor-pointer hover:bg-amber-200 hover:text-black text-white py-3 px-3 rounded-lg text-center w-full">
        همین الان رزرو کن
      </button>
    </>
  );
};

export default DetailsListsReserve;
