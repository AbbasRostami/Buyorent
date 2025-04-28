"use client";
import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiAparat } from "react-icons/si";

import samandehi from "../assets/samandehi-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import enamad from "../assets/enamad-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import eteh from "../assets/eteh-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import AsProfile from "../assets/AS-67207980 1.svg";
import AsProfile2 from "../assets/AS-67207980 1 (1).svg";
import Rectangle from "../assets/Rectangle 30.svg";
import Logo from "../assets/Logo - Name.svg";

import Image from "next/image";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";
// import './styles.css';

const Landingfooter = () => {
  return (
    <>
      <div className="bg-white border-[1px] flex flex-col mx-auto text-right w-full h-[1200px]">
        <div className="text-[#444] text-right leading-6 pt-4">
          <div className="flex justify-end text-3xl text-nowrap pr-36 pt-4">
            <h2 className="text-[#D27700]">
              بزرگترین مرجع خرید و فروش و اجاره ملک در کشور
            </h2>
            <h1 className="text-[#444] pl-2">بایورنت</h1>
          </div>
          <div className="flex justify-around">
            <div className="bg-white w-1/3 h-[340px] mt-18 shadow-2xl rounded-2xl">
              <Image
                className="dark:invert"
                src={Rectangle}
                alt=""
                width={530}
                height={110}
                priority
              />
            </div>

            <p className="w-1/3 pt-32 text-xl px-3 text-justify rtl">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
              کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
              جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای
              طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
              فارسی ایجاد کرد.{" "}
            </p>
          </div>
          <button className="bg-[#E89300] h-8 w-32 mr-[500px] text-white rounded-lg ">
            درباره بایورنت
          </button>

          <div className="flex justify-end pt-32 pr-36">
            <h4 className="text-[#9A815F] text-md text-nowrap pt-2 pr-2">
              ! بدی های ما رو به ما بگید خوبی های ما رو به دیگران
            </h4>
            <h3 className="text-[#D27700] text-3xl text-nowrap">
              بایورنت از نگاه مشتریان
            </h3>
          </div>

          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            className="mySwiper w-full h-96"
          >
            <SwiperSlide>
              {" "}
              <div className="border-[1px] w-full h-96 mt-2 flex justify-around">
                <div className="w-[554px] h-[230px] border-[1px] mt-20 ml-12 flex justify-end gap-5">
                  <div>
                    <div className="w-[250px] flex justify-between pt-3">
                      <p className="text-lg text-[#777777]">*****</p>

                      <h1 className="text-lg">مهرداد مشکور</h1>
                    </div>

                    <div className="w-[250px] flex justify-between pt-3">
                      <p className="text-[#777777] text-[12px]">1403/12/06</p>

                      <h2 className="text-[#777777]">پزشک</h2>
                    </div>

                    <div className="w-[250px] pt-5 text-justify">
                      <h3 className="text-[#777777] text-[14px]">
                        ترانسفر اوکی پذیرش اوکی سوییت چهار تخته سه شب اجاره
                        کردیم سوییت تمیز و قابل قبول بود چایی ساز داشت محوطه هتل
                        هم بسیار خوب و زیبا بود.{" "}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <Image
                      className=""
                      src={AsProfile}
                      alt=""
                      width={230}
                      height={230}
                      priority
                    />
                  </div>
                </div>

                <div className="w-[554px] h-[230px] border-[1px] mt-20 ml-12 flex justify-end gap-5">
                  <div>
                    <div className="w-[250px] flex justify-between pt-3">
                      <p className="text-lg text-[#777777]">*****</p>

                      <h1 className="text-lg">مریم طبتی</h1>
                    </div>

                    <div className="w-[250px] flex justify-between pt-3">
                      <p className="text-[#777777] text-[12px]">1403/12/06</p>

                      <h2 className="text-[#777777]">تاجر</h2>
                    </div>

                    <div className="w-[250px] pt-5 text-justify">
                      <h3 className="text-[#777777] text-[14px]">
                        ترانسفر اوکی پذیرش اوکی سوییت چهار تخته سه شب اجاره
                        کردیم سوییت تمیز و قابل قبول بود چایی ساز داشت محوطه هتل
                        هم بسیار خوب و زیبا بود.{" "}
                      </h3>
                    </div>
                  </div>

                  <div>
                    <Image
                      className=""
                      src={AsProfile2}
                      alt=""
                      width={230}
                      height={230}
                      priority
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="w-full h-[350px] border-[1px] bg-white flex justify-center">
        <div className="w-[1128px] h-[274px] flex justify-end border-2 border-[#A85F00] rounded-l-[20px] rounded-r-[190px]">
          <Image
            className=""
            src={Logo}
            alt=""
            width={118}
            height={116}
            priority
          />
        </div>

        <div className="w-[996px] h-[238px] flex bg-[#FFEFD9] rounded-r-[20px] rounded-l-[162px] absolute left-18 mt-5">
          <div className="w-1/6">
            <FaTelegramPlane className="ml-15 mt-6" size={30} />
            <FaInstagram className="ml-6 mt-6" size={30} />
            <SiAparat className="ml-6 mt-7" size={30} />
            <FaLinkedinIn className="ml-18 mt-6" size={30} />
          </div>

          <div className="w-1/6 text-center my-auto pr-10">
            <h5 className="text-black text-lg">ما را دنبال کنید</h5>
          </div>

          <div className="w-1/6 flex flex-col justify-around">
            <Image
              className=""
              src={enamad}
              alt=""
              width={66}
              height={66}
              priority
            />
            <Image
              className=""
              src={eteh}
              alt=""
              width={66}
              height={66}
              priority
            />
            <Image
              className=""
              src={samandehi}
              alt=""
              width={66}
              height={66}
              priority
            />
          </div>

          <div className="w-1/6 text-right pr-20 leading-7">
            <h4 className="text-black text-lg pt-4">تماس با ما</h4>
            <p className="text-[#737373] text-[12px]">مرکز پیام</p>
            <p className="text-[#737373] text-[12px]">دفتر مرکزی</p>
            <p className="text-[#737373] text-[12px]">مدیر شعبات</p>
            <p className="text-[#737373] text-[12px]">info@buyorent.com</p>
            <p className="text-[#737373] text-[12px]">021-22556256</p>
          </div>

          <div className="w-1/6 text-right pr-20 leading-7">
            <h3 className="text-black text-lg pt-4">لینک های مفید</h3>
            <p className="text-[#737373] text-[12px]">درباره ما</p>
            <p className="text-[#737373] text-[12px]">شرایط و ظوابط</p>
            <p className="text-[#737373] text-[12px]">راهنمای کاربران</p>
            <p className="text-[#737373] text-[12px]">پشتیبانی</p>
            <p className="text-[#737373] text-[12px]">اخبار و مقالات</p>
          </div>

          <div className="w-1/6 text-right pr-6">
            <h1 className="text-black text-lg pt-4">مختصری از بایورنت</h1>
            <h2 className="text-[#737373] text-[12px] text-balance text-justify pt-2">
              لورم ایپسوم تولید نامفهوم از صنعت چاپ و با استفاده از طراحان
              گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
              که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع
              با هدف بهبود ابزارهای کاربردی می باشد.{" "}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export { Landingfooter };
