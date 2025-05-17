"use client";
import React from "react";
import photo from "../../assets/image 5 (1).png";
import Image from "next/image";
import { BsPinAngle } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { LiaShareAltSolid } from "react-icons/lia";

const HeaderSectionSingle = ({ data }: any) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center  justify-center  gap-6 px-4 py-24 overflow-hidden max-w-screen-xl mx-auto">
        {/* بخش سمت چپ */}
        <div className="relative w-full max-w-[656px] aspect-[656/462] rounded-3xl overflow-hidden shadow">
          <Image src={photo} alt="تصویر بخش چپ" fill className="object-cover" />
        </div>

        {/* بخش سمت راست */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[656px]">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="relative w-full aspect-[320/230] rounded-3xl overflow-hidden shadow"
            >
              <Image
                src={photo}
                alt={`باکس ${item}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse md:justify-between gap-10 justify-center md:px-20 w-full items-center ">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full  border hover:border-color1 flex items-center justify-center cursor-pointer">
            <BsPinAngle size={26} />
          </div>
          <div className="w-10 h-10 rounded-full border hover:border-color1 flex items-center justify-center cursor-pointer">
            <CiHeart size={26} />
          </div>
          <div className="w-10 h-10 rounded-full bg-color1   flex items-center justify-center cursor-pointer">
            <LiaShareAltSolid className="text-amber-50" size={26} />
          </div>
        </div>

        <div className="text-center px-2  ">
          <p className="text-3xl font-bold"> {data.title} </p>
          <p className="md:text-lg text-medium  font-medium flex items-center gap-2 mt-2">
            <IoLocationOutline className="dark:text-amber-600" size={30} />
            {data.address}
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderSectionSingle;
