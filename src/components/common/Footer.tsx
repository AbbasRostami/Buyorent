import Image from "next/image";
import React from "react";
import { FaTelegramPlane, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { SiAparat } from "react-icons/si";

import samandehi from "./../../assets/samandehi-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import enamad from "./../../assets/enamad-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import eteh from "./../../assets/eteh-qsyjhvdpkg3mrncpddhc1pydnd5299bemn3wof7no2 1.svg";
import Logo from "./../../assets/Logo - Name.svg";

const usefulLinks = [
  "درباره ما",
  "شرایط و ظوابط",
  "راهنمای کاربران",
  "پشتیبانی",
  "اخبار و مقالات",
];
const contactLinks = [
  "مرکز پیام",
  "دفتر مرکزی",
  "مدیر شعبات",
  "info@buyorent.com",
  "021-22556256",
];
const certificates = [enamad, eteh, samandehi];
const socialLinks = [
  { icon: <FaTelegramPlane size={30} />, className: "sm:mr-16 mt-6" },
  { icon: <FaInstagram size={30} />, className: "sm:mr-28 mt-6" },
  { icon: <SiAparat size={30} />, className: "sm:mr-28 mt-7" },
  { icon: <FaLinkedinIn size={30} />, className: "sm:mr-16 mt-6" },
];

export default function Footer() {
  return (
    <div className="w-full h-[350px] bg-white flex justify-center dark:bg-[#0a192f]">
      {/* Desktop Version */}
      <div className="hidden md:flex w-full">
        <div className="w-[1128px] h-[274px] flex border-2 border-[#A85F00] rounded-l-[20px] rounded-r-[190px]">
          <Image
            className="pr-10"
            src={Logo}
            alt="Logo"
            width={180}
            height={116}
            priority
          />
        </div>

        <div className="w-[996px] h-[238px] flex bg-[#FFEFD9] dark:bg-gray-800 dark:text-amber-100 rounded-r-[20px] rounded-l-[162px] absolute left-18 mt-5">
          {/* About Section */}
          <div className="w-1/6 text-right pr-6 dark:text-amber-100">
            <h1 className="text-black text-lg pt-4 dark:text-amber-200">
              مختصری از بایورنت
            </h1>
            <p className="text-[#737373] text-[12px] text-balance text-justify pt-2 dark:text-amber-100">
              لورم ایپسوم تولید نامفهوم از صنعت چاپ و با استفاده از طراحان
              گرافیک است. چاپگرها و متون...
            </p>
          </div>

          {/* Useful Links */}
          <div className="w-1/6 text-right pr-20 leading-7">
            <h3 className="text-black text-lg pt-4 dark:text-amber-200">
              لینک های مفید
            </h3>
            {usefulLinks.map((link, index) => (
              <p
                key={index}
                className="text-[#737373] text-[12px] dark:text-amber-100"
              >
                {link}
              </p>
            ))}
          </div>

          {/* Contact Info */}
          <div className="w-1/6 text-right pr-20 leading-7">
            <h4 className="text-black text-lg pt-4 dark:text-amber-200">
              تماس با ما
            </h4>
            {contactLinks.map((link, index) => (
              <p
                key={index}
                className="text-[#737373] text-[12px] dark:text-amber-100"
              >
                {link}
              </p>
            ))}
          </div>

          {/* Certificates */}
          <div className="w-1/6 flex flex-col justify-around pr-24">
            {certificates.map((certificate, index) => (
              <Image
                key={index}
                src={certificate}
                alt={`certificate-${index}`}
                width={66}
                height={66}
                priority
              />
            ))}
          </div>

          {/* Social Media */}
          <div className="w-1/6 text-center my-auto pr-18">
            <h5 className="text-black text-lg dark:text-amber-200">
              ما را دنبال کنید
            </h5>
          </div>
          <div className="w-1/6">
            {socialLinks.map((social, index) => (
              <div key={index} className={social.className}>
                {social.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden w-full px-4 py-8">
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-[300px] border-2 border-[#A85F00] rounded-[20px] p-4 mb-8">
            <Image
              src={Logo}
              alt="Logo"
              width={120}
              height={78}
              priority
              className="mx-auto"
            />
          </div>

          <div className="w-full bg-[#FFEFD9] dark:bg-gray-800 rounded-[20px] p-6">
            <div className="space-y-6">
              {/* About Section */}
              <div className="text-center">
                <h1 className="text-black text-lg font-medium dark:text-amber-200">
                  مختصری از بایورنت
                </h1>
                <p className="text-[#737373] text-xs mt-2 dark:text-amber-100">
                  لورم ایپسوم تولید نامفهوم از صنعت چاپ و با استفاده از طراحان
                  گرافیک است...
                </p>
              </div>

              {/* Links Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="mt-2 space-y-2">
                  <h3 className="text-black text-base font-medium dark:text-amber-200">
                    لینک های مفید
                  </h3>
                  {usefulLinks.map((link, index) => (
                    <p
                      key={index}
                      className="text-[#737373] text-[12px] dark:text-amber-100"
                    >
                      {link}
                    </p>
                  ))}
                </div>

                <div className="mt-2 space-y-2">
                  <h4 className="text-black text-base font-medium dark:text-amber-200">
                    تماس با ما
                  </h4>
                  {contactLinks.map((link, index) => (
                    <p
                      key={index}
                      className="text-[#737373] text-[12px] dark:text-amber-100"
                    >
                      {link}
                    </p>
                  ))}
                </div>
              </div>

              {/* Certificates */}
              <div className="flex justify-center gap-4">
                {certificates.map((certificate, index) => (
                  <Image
                    key={index}
                    src={certificate}
                    alt={`certificate-${index}`}
                    width={50}
                    height={50}
                  />
                ))}
              </div>

              {/* Social Media */}
              <div className="flex justify-center gap-6">
                {socialLinks.map((social, index) => (
                  <div key={index} className={social.className}>
                    {social.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
