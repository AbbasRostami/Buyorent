import Image from "next/image";
import home from "./../../../assets/Landing/home.png";
import { IoIosArrowBack } from "react-icons/io";

import { MotionDiv, MotionP } from "../../providers/MotionWrapper";
import Link from "next/link";
import { HeroButton } from "../../providers/HeroUIClient";
import HeroSectionFilter from "./HeroSectionFilter";

export default function HeroSection() {
  return (
    <div className="lg:mx-24 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 ">
        <MotionDiv
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1 }}
          className="mx-2 xl:mx-24 mt-4"
        >
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-2xl lg:text-3xl xl:text-4xl font-semibold dark:text-amber-100"
          >
            یه انتخاب ساده ، یه جای راحت!
          </MotionP>

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-md md:text-lg xl:text-xl mt-4 dark:text-amber-200"
          >
            رزرو ، رهن ، اجاره و حتی خرید و فروش ملک مورد نظرتون مثل آب خوردن با
            <span>
              بای<span className="text-amber-500">و</span>رنت
            </span>
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <HeroButton className="group relative bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 text-amber-900 px-9 py-7 rounded-[3rem] text-xl md:text-2xl font-bold tracking-wide mt-10 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.03] hover:shadow-2xl hover:shadow-amber-500/30 overflow-hidden isolate">
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
                <div className="absolute -inset-[3px] animate-rotate-metallic bg-[conic-gradient(from_var(--angle),#f59e0b_0%,#d97706_30%,transparent_80%,#d97706_100%)] opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-amber-100/50 backdrop-blur-sm m-[3px] rounded-[3rem]" />
              </div>

              <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
                <div className="absolute -top-[150%] -left-[150%] w-[400%] h-[400%] animate-diamond-shine bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,transparent_60%)] opacity-70 mix-blend-overlay" />
              </div>

              <div className="absolute inset-0 rounded-[3rem] overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[#b45309]/60 rounded-full animate-float-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>

              <Link href="/mortgage-and-house-rent" className="group">
                <span className="relative z-20 flex items-center gap-4 cursor-pointer">
                  <span className="bg-gradient-to-r from-[#92400e] to-[#78350f] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)]">
                    رهن و اجاره ملک
                  </span>
                  <IoIosArrowBack className="w-8 h-8 text-[#78350f] transition-transform duration-500 group-hover:translate-x-3 group-hover:text-[#92400e]" />
                </span>
              </Link>
            </HeroButton>
          </MotionDiv>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto"
        >
          <Image src={home} alt="home" />
        </MotionDiv>
      </div>
      <HeroSectionFilter />
    </div>
  );
}
