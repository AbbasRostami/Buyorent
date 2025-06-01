"use client";
import { ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BsBookmarkStarFill } from "react-icons/bs";

const Statistics = () => {
  const { theme } = useTheme();
  const [state, setState] = useState({
    series: [50, 40, 50, 20],
  });
  const chartOptions: ApexOptions = {
    chart: {
      width: 380,
      type: "donut" as const,
    },
    labels: [
      "علاقه مندی ها",
      "کل رزرو ها",
      "رزرو های فعال",
      "رزرو های پرداخت نشده",
    ],
    stroke: {
      show: false,
      width: 0,
      colors: ["transparent"],
    },
    colors: ["#F97316", "#FACC15", "#4ADE80", "#60A5FA"],
    legend: {
      position: "right",
      fontSize: "16px",
      fontWeight: 400,
      labels: {
        colors: theme === "dark" ? "#F97316" : "#000",
        useSeriesColors: false,
      },
      markers: {
        size: 12,
        offsetX: 5,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
      inverseOrder: true,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="shadow-xl transition-all duration-300 items-center justify-center h-full rounded-2xl bg-white/90 border hover:bg-gray-100 border-gray-200 dark:border-gray-800  dark:hover:bg-gray-700/80 dark:bg-gray-900 p-4 space-y-4">
      <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
        <BsBookmarkStarFill className="text-color1" size={24} />
        وضعیت رزروها
      </h2>
      <ReactApexChart
        className="flex items-center justify-center"
        options={chartOptions}
        series={state.series}
        type="donut"
        height={200}
      />
    </div>
  );
};

export default Statistics;
