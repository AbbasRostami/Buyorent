import Image from "next/image";
import React from "react";
import { BsPinAngle } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { LiaShareAltSolid } from "react-icons/lia";
import photo from "../../assets/image 5 (1).png";

const HeaderSectionReserve = () => {
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
        <div className="flex items-center gap-2">
          <BsPinAngle className="cursor-pointer" size={30} />
          <LiaShareAltSolid className="cursor-pointer" size={30} />
        </div>

        <div className="text-center px-2  ">
          <p className="text-3xl font-bold">هتل همایون فر کیش ایران</p>
          <p className="md:text-lg text-medium  font-medium flex items-center gap-2 mt-2">
            <IoLocationOutline className="dark:text-amber-600" size={30} />
            گیلان ، رشت ، میدان آزادی ، روبه روی پاساژ مال
          </p>
        </div>
      </div>
    </>
  );
};

export default HeaderSectionReserve;
