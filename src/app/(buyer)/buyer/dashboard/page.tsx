import EcommerceMetrics from "./components/EcommerceMetrics";
import MonthlyTarget from "./components/MonthlyTarget";
import Statistics from "./components/Statistics";
import UserProfileCard from "./components/UserProfileCard";
import LastetReseves from "./components/LastetReseves";

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
          <Statistics />
        </div>
        <div className="col-span-12 xl:col-span-12">
          <LastetReseves />
        </div>
      </div>
    </>
  );
}
