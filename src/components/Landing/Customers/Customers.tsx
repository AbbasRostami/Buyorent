import React from "react";

import { GoDotFill } from "react-icons/go";
import CustomersSwiper from "./CustomersSwiper";

const Customers = () => {
  return (
    <div className="mt-14 mb-20 px-8 ">
      <div className="flex flex-col sm:flex-row items-center mb-10">
        <GoDotFill className="text-[#D9D9D9] hidden sm:block" size={30} />
        <p className="text-[#D27700] dark:text-amber-500 text-3xl font-black text-nowrap step-7">
          بایورنت از نگاه مشتریان
        </p>
        <p
          className="text-[#9A815F] dark:text-gray-300 text-[16px] font-medium pt-2 pr-2
             whitespace-normal md:whitespace-nowrap leading-relaxed"
        >
          بدی های ما رو به ما بگید خوبی های ما رو به دیگران !
        </p>
      </div>

      <div className="relative ">
        <CustomersSwiper />
      </div>
    </div>
  );
};

export default Customers;
