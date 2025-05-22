import EcommerceMetrics from "./Dashboard/EcommerceMetrics";
import MonthlyTarget from "./Dashboard/MonthlyTarget";
import NewCoursesSlider from "./Dashboard/NewCoursesSlider";
import Statistics from "./Dashboard/Statistics";
import UserProfileCard from "./Dashboard/UserProfileCard";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-6">
          <EcommerceMetrics />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <UserProfileCard />
        </div>

        <div className="col-span-12 xl:col-span-6">
          <MonthlyTarget />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <NewCoursesSlider />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <Statistics />
        </div>
      </div>
    </>
  );
}
