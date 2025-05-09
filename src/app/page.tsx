import CustomSwiper from "@/components/Landing/Categories";
import HeroSection from "@/components/Landing/HeroSection";
import BayourtBiggest from "@/components/Landing/BayourtBiggest";
import Customers from "@/components/Landing/Customers";
import Reduction from "@/components/Landing/Reduction";
import Notice from "@/components/Landing/Notice";
import HotDealsOfWeek from "@/components/Landing/HotDealsOfWeek";
import Rating from "@/components/Landing/Rating";
import Favourites from "@/components/Landing/Favorites";

export default function Home() {
  return (
    <div className="px-2 md:px-8 py-4  dark:bg-[#0a192f]">
      <HeroSection />
      <CustomSwiper />
      <Reduction />
      <Notice />
      <BayourtBiggest />
      <Favourites />
      <HotDealsOfWeek />
      <Rating />
      <Customers />
    </div>
  );
}
