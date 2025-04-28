import React from "react";
import Image from "next/image";
import Rectangle from "../assets/Rectangle 18.svg";
import toilet from "../assets/toilet 1.svg";
import shower from "../assets/shower 1.svg";
import bed from "../assets/bed 1.svg";
import Vector from "../assets/Vector.svg";
import Line from "../assets/Line 4.svg";


const LandingCard = () => {
  return (
    <div className=" mt-12  ">
      <div className="shadow-amber-50 bg-[#FFFAF3] rounded-2xl h-[360px] w-[282px]  pt-3 pl-2  ">
        <div className="shadow-2xl rounded-2xl [transform:rotateY(49deg\)] -translate-3 w-[95%] ]">
          <Image
            className="shadow-2xs w-[20rem] rounded-2xl [transform:rotateY(10deg)]  "
            src={Rectangle}
            alt=""
            width={300}
            height={200}
            priority
          />
        </div>
        <p className="pr-4 text-[20px] text-[#444444] mt-2 flex justify-end  ">
          ویلای دوبلکس ساحلی
        </p>
        <p className="pr-4  text-[18px] text-[#666666] flex justify-end gap-1  ">
          مازندران , بابلسر
          <Image
            className=""
            src={Vector}
            alt=""
            width={8}
            height={8}
            priority
          />
        </p>
        <br />
        <div className="flex justify-around text-[#000000] ">
          <h2 className="flex gap-2  ">
            6
            <Image
              className=""
              src={toilet}
              alt=""
              width={14}
              height={14}
              priority
            />
          </h2>
          <h2 className="flex gap-2">
            3
            <Image
              className=""
              src={shower}
              alt=""
              width={14}
              height={14}
              priority
            />
          </h2>
          <h2 className="flex gap-2">
            2
            <Image
              className=""
              src={bed}
              alt=""
              width={14}
              height={14}
              priority
            />
          </h2>
        </div>

        <p>
          <Image
            className="text-[#D4D4D4] mt-3 mx-auto"
            src={Line}
            alt=""
            width={220}
            height={3}
            priority
          />
        </p>

        <div className="flex gap-5 mt-3 justify-evenly ">
          <h2 className="text-[#C8C8C8] text-[16px] line-through  ">
            ۱.۷۵۰.۰۰۰ ت
          </h2>
          <h2 className="text-[#C8C8C8] text-[18px]">۱.۷۵۰.۰۰۰ ت</h2>
        </div>
      </div>
    </div>
  );
};

export { LandingCard };
