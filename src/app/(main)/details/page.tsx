import React from "react";
import Image from "next/image";
import photo from "./../../../assets/image 5 (1).png";
import { BsPinAngle } from "react-icons/bs";
import { LiaShareAltSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";

const Details = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center  justify-center gap-6 px-4 py-24 overflow-hidden max-w-screen-xl mx-auto">
        {/* بخش سمت چپ */}
        <div className="relative w-full max-w-[656px] aspect-[656/462] rounded-3xl overflow-hidden shadow">
          <Image src={photo} alt="تصویر بخش چپ" fill className="object-cover" />
        </div>

        {/* بخش سمت راست */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[656px]">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="relative w-full aspect-[320/230] rounded-3xl overflow-hidden shadow"
            >
              <Image
                src={photo}
                alt={`باکس ${item}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse md:justify-between gap-10 justify-center md:px-20 w-full items-center ">
        <div className="flex items-center gap-2">
          <BsPinAngle size={30} />
          <LiaShareAltSolid size={30} />
        </div>

        <div className="text-center px-2  ">
          <p className="text-3xl font-bold">هتل همایون فر کیش ایران</p>
          <p className="md:text-lg text-medium  font-medium flex items-center gap-2 mt-2">
            <IoLocationOutline size={23} />
            گیلان ، رشت ، میدان آزادی ، روبه روی پاساژ مال
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-16 px-24">
        {/* ستون راست */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-xl font-bold">امکانات هتل</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-800 text-sm">
            <div>تعداد خواب: ۴ خواب</div>
            <div>اجاق گاز: دارد</div>
            <div>بالکن: دارد</div>
            <div>سرویس ایرانی: کوار</div>
            <div>نوع نما: رومی</div>
            <div>نوع سازه: نوساز</div>
            <div>پارکینگ: دارد</div>
            <div>آسانسور: دارد</div>
            <div>اوپن: سنگی</div>
          </div>

          <button className="text-primary font-semibold">
            همین حالا رزرو کنید
          </button>

          {/* فرم رزرو */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">تاریخ ورود</label>
              <input
                type="text"
                placeholder="انتخاب کنید"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">تاریخ خروج</label>
              <input
                type="text"
                placeholder="انتخاب کنید"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">تعداد نفرات</label>
            <input
              type="number"
              placeholder="وارد کنید"
              className="input input-bordered w-full"
            />
          </div>

          {/* قیمت */}
          <div className="text-sm">
            <span className="line-through text-gray-500">۲٬۰۰۰٬۰۰۰ تومان</span>
            <span className="text-lg font-bold mr-2">۱٬۵۰۰٬۰۰۰ تومان</span>
          </div>

          <button className="bg-primary text-white py-3 px-6 rounded-lg text-center w-full">
            همین الان رزرو کن
          </button>
        </div>

        {/* ستون چپ */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-xl font-bold">چرا هتل همایون رو انتخاب کنیم؟</h2>
          <p className="text-gray-700 leading-7">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>

          {/* تصاویر زیر متن */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-full aspect-[1/1] rounded overflow-hidden shadow">
              <Image
                src={photo}
                alt="تصویر 1"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
            <div className="relative w-full aspect-[1/1] rounded overflow-hidden shadow">
              <Image
                src={photo}
                alt="تصویر 2"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
          </div>

          {/* متن دوم تکرار شده */}
          <h2 className="text-xl font-bold mt-4">
            چرا هتل همایون رو انتخاب کنیم؟
          </h2>
          <p className="text-gray-700 leading-7">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;
