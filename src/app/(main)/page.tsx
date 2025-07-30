import dynamic from "next/dynamic";
import HeroSection from "@/components/Landing/HeroSection/HeroSection";
const CustomSwiper = dynamic(
  () => import("@/components/Landing/Categories/Categories")
);
const Customers = dynamic(
  () => import("@/components/Landing/Customers/Customers")
);
const Notice = dynamic(() => import("@/components/Landing/Notice/Notice"));
const Rating = dynamic(() => import("@/components/Landing/Rating/Rating"));
const Favourites = dynamic(
  () => import("@/components/Landing/Favorites/Favorites")
);
const BayourtBiggest = dynamic(
  () => import("@/components/Landing/BayourtBiggest/BayourtBiggest")
);
const Reduction = dynamic(
  () => import("@/components/Landing/Reduction/Reduction")
);
const HotDealsOfWeek = dynamic(
  () => import("@/components/Landing/HotDealsOfWeek/HotDealsOfWeek")
);

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
