import Image from "next/image";
import React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiAparat } from "react-icons/si";

import samandehi from "./../../assets/samandehi-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import enamad from "./../../assets/enamad-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import eteh from "./../../assets/eteh-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import Logo from "./../../assets/Logo - Name.svg";
export default function Footer() {
  return (
    <div className="w-full h-[350px]  bg-white flex justify-center dark:bg-[#0a192f]">
      <div className="w-[1128px] h-[274px] flex border-2 border-[#A85F00] rounded-l-[20px] rounded-r-[190px]">
        <Image
          className="pr-10"
          src={Logo}
          alt=""
          width={180}
          height={116}
          priority
        />
      </div>

      <div className="w-[996px] h-[238px] flex bg-[#FFEFD9] dark:bg-gray-800 dark:text-amber-100 rounded-r-[20px] rounded-l-[162px] absolute left-18 mt-5">
        <div className="w-1/6 text-right pr-6 dark:text-amber-100">
          <h1 className="text-black text-lg pt-4 dark:text-amber-200">مختصری از بایورنت</h1>
          <h2 className="text-[#737373] text-[12px] text-balance text-justify pt-2 dark:text-amber-100">
            لورم ایپسوم تولید نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک
            است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
            است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف
            بهبود ابزارهای کاربردی می باشد.{" "}
          </h2>
        </div>

        <div className="w-1/6 text-right pr-20 leading-7">
          <h3 className="text-black text-lg pt-4 dark:text-amber-200">لینک های مفید</h3>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">درباره ما</p>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">شرایط و ظوابط</p>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">راهنمای کاربران</p>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">پشتیبانی</p>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">اخبار و مقالات</p>
        </div>

        <div className="w-1/6 text-right pr-20 leading-7">
          <h4 className="text-black text-lg pt-4 dark:text-amber-200">تماس با ما</h4>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">مرکز پیام</p>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">دفتر مرکزی</p>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">مدیر شعبات</p>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">info@buyorent.com</p>
          <p className="text-[#737373] text-[12px] dark:text-amber-100">021-22556256</p>
        </div>

        <div className="w-1/6 flex flex-col justify-around pr-24">
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

        <div className="w-1/6 text-center my-auto pr-18">
          <h5 className="text-black text-lg dark:text-amber-200">ما را دنبال کنید</h5>
        </div>

        <div className="w-1/6">
          <FaTelegramPlane className="mr-16 mt-6" size={30} />
          <FaInstagram className="mr-28 mt-6" size={30} />
          <SiAparat className="mr-28 mt-7" size={30} />
          <FaLinkedinIn className="mr-16 mt-6" size={30} />
        </div>
      </div>
    </div>
  );
}
