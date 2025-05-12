import React from "react";
import Rectangle from "./../../../assets/Rectangle 30.png";
import shape from "./../../../assets/Ellipse 18.png";
import { GoDotFill } from "react-icons/go";
import Image from "next/image";
import {
  MotionButton,
  MotionDiv,
  MotionP,
} from "@/components/providers/MotionWrapper";
const BayourtBiggest = () => {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-12 px-8 md:px-8 mb-24">
        <MotionDiv
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 3 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 text-right lg:text-left mt-10 lg:mt-16"
        >
          <MotionP
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0 }}
            className="text-[#D27700] font-black xs:mt-32 sm:mt-28  flex items-center flex-wrap justify-center lg:justify-start text-center lg:text-right"
          >
            <GoDotFill className="text-[#D9D9D9]" size={30} />
            <span className="text-[#444444] text-2xl md:text-3xl mx-2 dark:text-amber-200">
              بای<span className="text-[#D27700] ">و</span>رنت
            </span>
            <span className="text-2xl md:text-3xl dark:text-amber-200">
              بزرگترین مرجع خرید و اجاره ملک در کشور
            </span>
          </MotionP>

          <MotionP
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-base md:text-lg font-normal text-justify mt-8 md:mt-12 leading-relaxed"
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد...
          </MotionP>

          <div className="flex justify-end mt-8">
            <MotionButton
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="bg-[#E89300] px-6 md:px-8 py-2 rounded-lg dark:bg-gray-700 "
            >
              <span className="text-base md:text-lg cursor-pointer font-bold text-white dark:text-amber-100">
                درباره بایورنت
              </span>
            </MotionButton>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 flex justify-center relative ml-2 lg:ml-0"
        >
          <Image
            src={shape}
            priority
            alt=""
            width={300}
            height={150}
            className="object-cover z-9"
          />
          <Image
            className="rounded-4xl z-10 absolute top-8 md:top-14 object-cover shadow-xl border-[8px] md:border-[12px] border-amber-50 transform-style preserve-3d -translate-x-4 md:-translate-x-6"
            style={{ transform: "perspective(800px) rotateY(20deg)" }}
            src={Rectangle}
            alt=""
            width={500}
            height={250}
            priority
          />
        </MotionDiv>
      </div>
    </>
  );
};

export default BayourtBiggest;
