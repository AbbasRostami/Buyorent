import CustomSwiper from "@/components/Landing/Categories";
import HeroSection from "@/components/Landing/HeroSection";
import BayourtBiggest from "@/components/Landing/BayourtBiggest";
import Customers from "@/components/Landing/Customers";

export default function Home() {
  return (
    <div className="px-2 md:px-8 py-4 dark:bg-[#0a192f]">
      <HeroSection />
      <CustomSwiper />
      {/* <LandinCenter />  */}
      <BayourtBiggest />
      <Customers />
    </div>
  );
}
