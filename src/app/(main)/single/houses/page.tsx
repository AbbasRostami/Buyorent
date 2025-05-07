"use client";
import React from "react";
import Image from "next/image";
import photo from "../../../../assets/image 5 (1).png";
import { BsPinAngle } from "react-icons/bs";
import { LiaShareAltSolid } from "react-icons/lia";
import {
  IoHeartCircleOutline,
  IoHeartCircleSharp,
  IoLocationOutline,
} from "react-icons/io5";
import { Accordion, AccordionItem, Input } from "@heroui/react";
import image from "../../../../assets/Avatar2.png";
import image2 from "../../../../assets/Avatar1.png";
import { CiHeart } from "react-icons/ci";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { GiPositionMarker } from "react-icons/gi";
import { FaHashtag, FaPhoneVolume } from "react-icons/fa6";

const iconMarkup = renderToStaticMarkup(
  <GiPositionMarker size={40} color="blue" />
);
const customIcon = new L.DivIcon({
  html: iconMarkup,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const position: [number, number] = [36.560221, 53.060004]; 
const Details = () => {
  const comments = [
    {
      id: 1,
      author: "عباس بهبود",
      date: "۱۵ اردیبهشت ۱۴۰۴",
      content: "راضی نبودم، چرت محض بود این هتل...",
      rating: 4.5,
      replies: [
        {
          id: 11,
          author: "مدیر هتل",
          date: "۱۶ اردیبهشت ۱۴۰۴",
          content: "با احترام، شرایط خارج از کنترل ما بود...",
          replies: [
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      author: "عباس بهبود",
      date: "۱۵ اردیبهشت ۱۴۰۴",
      content: "راضی نبودم، چرت محض بود این هتل...",
      rating: 4.5,
      replies: [
        {
          id: 11,
          author: "مدیر هتل",
          date: "۱۶ اردیبهشت ۱۴۰۴",
          content: "با احترام، شرایط خارج از کنترل ما بود...",
          replies: [
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      author: "عباس بهبود",
      date: "۱۵ اردیبهشت ۱۴۰۴",
      content: "راضی نبودم، چرت محض بود این هتل...",
      rating: 4.5,
      replies: [
        {
          id: 11,
          author: "مدیر هتل",
          date: "۱۶ اردیبهشت ۱۴۰۴",
          content: "با احترام، شرایط خارج از کنترل ما بود...",
          replies: [
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
          ],
        },
        {
          id: 11,
          author: "مدیر هتل",
          date: "۱۶ اردیبهشت ۱۴۰۴",
          content: "با احترام، شرایط خارج از کنترل ما بود...",
          replies: [
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      author: "عباس بهبود",
      date: "۱۵ اردیبهشت ۱۴۰۴",
      content: "راضی نبودم، چرت محض بود این هتل...",
      rating: 4.5,
      replies: [
        {
          id: 11,
          author: "مدیر هتل",
          date: "۱۶ اردیبهشت ۱۴۰۴",
          content: "با احترام، شرایط خارج از کنترل ما بود...",
          replies: [
            {
              id: 111,
              author: "کاربر مهمان",
              date: "۱۷ اردیبهشت ۱۴۰۴",
              content: "اما شما باید مسئولیت پذیر باشید...",
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex flex-col md:flex-row items-center  justify-center  gap-6 px-4 py-24 overflow-hidden max-w-screen-xl mx-auto">
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full  border hover:border-color1 flex items-center justify-center cursor-pointer">
            <BsPinAngle size={26} />
          </div>
          <div className="w-10 h-10 rounded-full border hover:border-color1 flex items-center justify-center cursor-pointer">
            <CiHeart size={26} />
          </div>
          <div className="w-10 h-10 rounded-full bg-color1   flex items-center justify-center cursor-pointer">
            <LiaShareAltSolid className="text-amber-50" size={26} />
          </div>
        </div>

        <div className="text-center px-2  ">
          <p className="text-3xl font-bold">هتل همایون فر کیش ایران</p>
          <p className="md:text-lg text-medium  font-medium flex items-center gap-2 mt-2">
            <IoLocationOutline className="dark:text-amber-600" size={30} />
            گیلان ، رشت ، میدان آزادی ، روبه روی پاساژ مال
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-start lg:flex-row gap-8 my-16 px-10 md:px-20">
        {/* ستون راست */}
        <div className="w-full lg:w-1/2 space-y-6">
          <button className="text-lg font-bold border border-color2 px-4 py-2 rounded-full  text-color1">
            امکانات ملک
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3 text-[16px] font-medium">
            <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
              <span className="text-[#d27700] dark:text-amber-400">
                تعداد خواب
              </span>
              <span className="text-gray-800 dark:text-gray-100">۴ خواب</span>
            </div>
            <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
              <span className="text-[#d27700] dark:text-amber-400">
                اجاق گاز
              </span>
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
              <span className="text-[#d27700] dark:text-amber-400">
                نوع نما
              </span>
              <span className="text-gray-800 dark:text-gray-100">رومی</span>
            </div>
            <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
              <span className="text-[#d27700] dark:text-amber-400">
                نوع سازه
              </span>
              <span className="text-gray-800 dark:text-gray-100">نوساز</span>
            </div>
            <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
              <span className="text-[#d27700] dark:text-amber-400">
                پارکینگ
              </span>
              <span className="text-gray-800 dark:text-gray-100">دارد</span>
            </div>
            <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
              <span className="text-[#d27700] dark:text-amber-400">
                آسانسور
              </span>
              <span className="text-gray-800 dark:text-gray-100">دارد</span>
            </div>
            <div className="flex flex-col pr-3 border-r-3 border-[#d27700]">
              <span className="text-[#d27700] dark:text-amber-400">اوپن</span>
              <span className="text-gray-800 dark:text-gray-100">سنگی</span>
            </div>
          </div>

          <button className="text-xl font-semibold text-[#943600] mt-4 border rounded-full px-4 py-2 dark:text-amber-400">
            قیمت رهن‌واجاره و اطلاعات تماس
          </button>

          <div className="grid gap-10 items-center sm:grid-cols-2">
            <div className="flex flex-col gap-2 pr-3 border-r-3 border-[#d27700]">
              <span className="text-[#d27700] dark:text-amber-400 text-xl font-bold">
                قیمت اجاره از
              </span>
              <span className="dark:text-gray-100 font-bold text-2xl text-[#1E1E1E]">
                1،200،000،000{" "}
                <span className="text-[#595959] font-bold text-sm dark:text-amber-100">
                  تومان
                </span>{" "}
              </span>
            </div>

            <div className="flex flex-col gap-2 pr-3 border-r-3 border-[#d27700]">
              <span className="text-[#d27700] dark:text-amber-400 text-xl font-bold">
                قیمت رهن از
              </span>
              <span className="dark:text-gray-100 font-bold text-2xl text-[#1E1E1E]">
                1،200،000،000{" "}
                <span className="text-[#595959] font-bold text-sm dark:text-amber-100">
                  تومان
                </span>{" "}
              </span>
            </div>

            <div className="flex items-center justify-start gap-2 ">
              <Image
                src={image}
                alt="phone"
                width={50}
                height={50}
                className=" rounded-full"
              />
              <div>
                <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  عباس بهبودی
                </p>
                <p className="text-medium font-normal">15 اردیبهشت 1404</p>
              </div>
            </div>

            <div className="flex justify-start items-center gap-2 ">
              <div className="w-[50px] h-[50px] border border-amber-500 dark:border-amber-300 flex justify-center items-center rounded-full ">
                <FaPhoneVolume className="text-gray-800 dark:text-amber-100" size={20} />
              </div>

              <div className="bg-color1 dark:bg-gray-700 rounded-full px-6 py-3 text-white font-bold text-medium">
                شماره تماس : 5642***0938
              </div>
            </div>

            <p className=" flex items-center gap-1 text-medium font-semibold text-[#979797]">
              <FaHashtag />
              برچسب ها:
              <span className="text-medium font-semibold  text-color2">
                #رهن‌واجاره
              </span>
              <span className="text-medium font-semibold  text-color2">
                #خونه‌آپارتمانی
              </span>
            </p>
          </div>
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

          <div className="relative rounded-2xl overflow-hidden z-0 w-full h-72">
            <button className="text-medium font-semibold px-4 py-2 rounded-full text-color1 dark:text-amber-200 border mb-7">موقعیت مکانی</button>
            <MapContainer
              center={position}
              zoom={15}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  <div className="w-[295px] h-[106px] bg-gradient-to-r from-[#cf9952] to-[#E89300] backdrop-blur-sm rounded-[16px] flex items-center p-3 text-white gap-3 shadow-xl border border-white/20">
                    {/* تصویر ملک */}
                    <div className="relative shrink-0">
                      <Image
                        src={image}
                        alt="هتل"
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-red-500 text-sm px-2 py-0.5 rounded-full">
                        ٪۲۰
                      </div>
                    </div>

                    {/* اطلاعات ملک */}
                    <div className="flex flex-col justify-between h-full flex-1">
                      <div>
                        <h3 className="font-bold text-2xl truncate mb-1 text-white/90">
                          هتل لوکس همایون
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-white/80">
                          <IoLocationOutline size={23} className="shrink-0" />
                          <span className="truncate font-medium text-lg">
                            گیلان، رشت، میدان آزادی
                          </span>
                        </div>
                      </div>

                      {/* قیمت‌ها */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-medium font-bold line-through opacity-75">
                              ۲,۵۰۰,۰۰۰
                            </span>
                            <span className="text-medium font-bold">
                              ۱,۸۰۰,۰۰۰
                            </span>
                          </div>
                          <span className="text-medium font-bold">تومان</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>

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
          <div className="mt-6 space-y-6">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-[#f9f9f9] dark:bg-gray-800 rounded-2xl p-4 shadow-sm space-y-4"
              >
                {/* نویسنده، تاریخ، و متن کامنت */}
                <div className="flex items-center gap-3">
                  <Image
                    src={image2}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                  <div className="text-sm font-medium">
                    <span className="text-medium font-medium">
                      {comment.author}
                    </span>
                    <span className="text-color1 mx-2">در</span>
                    <span className="text-gray-500 dark:text-gray-300/85">
                      {comment.date}
                    </span>
                  </div>
                </div>

                <p className="text-medium font-semibold text-gray-800 dark:text-amber-50 leading-6">
                  {comment.content}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-100">
                  <div className="flex items-center gap-3">
                    <IoHeartCircleOutline className="text-color2" size={22} />
                    <span className="text-color2 font-bold text-medium">
                      {comment.rating}
                    </span>
                    <span className="text-color2 font-bold text-medium cursor-pointer">
                      پاسخ دادن
                    </span>
                  </div>
                </div>

                {/* پاسخ‌ها */}
                {comment.replies.length > 0 && (
                  <Accordion selectionMode="multiple">
                    <AccordionItem
                      aria-label={`پاسخ‌های کامنت ${comment.id}`}
                      title={
                        <span className="text-sm font-bold text-gray-500 dark:text-amber-200/75 cursor-pointer">
                          مشاهده {comment.replies.length} پاسخ
                        </span>
                      }
                    >
                      <div className="mt-4 space-y-4 border-r-2 pr-4 border-gray-200 ">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3 shadow-sm space-y-2"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <Image
                                src={image}
                                alt="avatar"
                                className="w-7 h-7 rounded-full"
                              />
                              <div className="text-sm font-medium">
                                <span>{reply.author}</span>
                                <span className="text-color1 mx-2">در</span>
                                <span className="text-gray-500 dark:text-gray-300/85">
                                  {reply.date}
                                </span>
                              </div>
                            </div>
                            <p className="text-medium font-semibold dark:text-amber-50 text-gray-800 leading-6">
                              {reply.content}
                            </p>

                            {/* دکمه پاسخ به ریپلای */}
                            <div className="text-xs text-color2 font-bold cursor-pointer mt-1 pr-10 text-right">
                              پاسخ دادن
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
