"use client";
import React from "react";
import DetailsLists from "@/components/SingleHouses/DetailsLists";
import CommentSingleHouses from "@/components/SingleHouses/Comments";
import MapSingleReserve from "@/components/SingleHouses/Map";
import HeaderSectionSingle from "@/components/SingleHouses/HeaderSection";


const SingleHouses = () => {
  return (
    <>
      <HeaderSectionSingle />

      <div className="flex flex-col justify-center items-start lg:flex-row gap-8 my-16 px-10 md:px-20">
        {/* ستون راست */}
        <div className="w-full lg:w-1/2 space-y-6">
          <DetailsLists />
        </div>

        {/* ستون چپ */}
        <div className="w-full lg:w-1/2 space-y-6">
          <button className="text-lg font-bold border border-color2 px-4 py-2 rounded-full text-color1">
            درباره ملک
          </button>
          <h2 className="text-2xl font-bold text-justify">
            چرا هتل همایون رو انتخاب کنیم؟
          </h2>
          <p className="text-gray-700 dark:text-amber-50 leading-7 text-medium font-medium text-justify">
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
            طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید
            سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
            و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
            آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
            شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
            فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت
            که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
            رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
            پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>

          <MapSingleReserve />

          <p className="text-gray-700 dark:text-amber-50 leading-7 text-medium font-medium text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت.
          </p>

          {/* دکمه‌های بالا */}
          <div className="flex items-center gap-4 mt-8 mb-10">
            <button className="px-4 py-1.5 border border-color2 cursor-pointer dark:hover:text-black hover:bg-amber-200 text-color1 rounded-full font-semibold text-medium">
              نظرات کاربران
            </button>
            <button className="px-4 py-1.5 text-color2  cursor-pointer dark:hover:text-black hover:bg-amber-200  rounded-full font-medium text-semibold flex items-center gap-1">
              <span className="text-2xl leading-none">+</span>
              <span>نظر شما</span>
            </button>
          </div>

          {/* نظرات کاربران */}
          <CommentSingleHouses />
        </div>
      </div>
    </>
  );
};

export default SingleHouses;
