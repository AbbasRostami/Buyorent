import ReductionCarousel from "./Clients/ReductionCarousel.client";
import ReductionHeader from "./ReductionHeader";

export default function Reduction() {
  return (
    <div className="relative rounded-2xl border-2 border-gray-200 mt-20">
      <ReductionHeader />
      <ReductionCarousel />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t-2 border-gray-200 rounded-t-md inverted_bottom drop-shadow-2xl">
        <div className="customer flex justify-center p-1" />
      </div>
    </div>
  );
}
