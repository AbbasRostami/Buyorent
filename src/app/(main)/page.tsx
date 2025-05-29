import CustomSwiper from "@/components/Landing/Categories/Categories";
import HeroSection from "@/components/Landing/HeroSection/HeroSection";
import Customers from "@/components/Landing/Customers/Customers";
import Notice from "@/components/Landing/Notice/Notice";
import Rating from "@/components/Landing/Rating/Rating";
import Favourites from "@/components/Landing/Favorites/Favorites";
import BayourtBiggest from "@/components/Landing/BayourtBiggest/BayourtBiggest";
import Reduction from "@/components/Landing/Reduction/Reduction";
import HotDealsOfWeek from "@/components/Landing/HotDealsOfWeek/HotDealsOfWeek";
import Tour from "./Tour";

export default function Home() {
  return (
    <div className="px-2 md:px-8 py-4  dark:bg-[#0a192f]">
      <Tour />
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
