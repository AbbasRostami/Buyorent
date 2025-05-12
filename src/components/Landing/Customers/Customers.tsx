import React from "react";

import { GoDotFill } from "react-icons/go";
import CustomersSwiper from "./CustomersSwiper";

const Customers = () => {
  return (
    <div className="mt-14 mb-20 px-8">
      <div className="flex flex-col sm:flex-row items-center mb-10">
        <GoDotFill className="text-[#D9D9D9] hidden sm:block" size={30} />
        <p className="text-[#D27700] text-3xl font-black text-nowrap">
          بایورنت از نگاه مشتریان
        </p>
        <h4 className="text-[#9A815F] text-[16px] font-medium text-nowrap pt-2 pr-2">
          بدی های ما رو به ما بگید خوبی های ما رو به دیگران !
        </h4>
      </div>

      <div className="relative">
        <CustomersSwiper />
      </div>
    </div>
  );
};

export default Customers;
