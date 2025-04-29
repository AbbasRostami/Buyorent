import Header from "@/components/common/Header";
import CustomSwiper from "@/components/Landing/Categories";
import HeroSection from "@/components/Landing/HeroSection";
import { LandinCenter } from "@/components/landinCenter";
import { Landingfooter } from "@/components/Landing-footer";
import Image from "next/image";
import BayourtBiggest from "@/components/Landing/BayourtBiggest";
import Customers from "@/components/Landing/Customers";

export default function Home() {
  return (
    <div className="px-2 md:px-8 py-4 dark:bg-[#0a192f]">
      <Header />
      <HeroSection />
      <CustomSwiper />
      {/* <LandinCenter />  */}
      <BayourtBiggest />
      <Customers />
    </div>
  );
}
