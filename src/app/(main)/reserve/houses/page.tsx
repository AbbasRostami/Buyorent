"use client";
import React from "react";
import HeaderSectionReserve from "@/components/ReserveHouses/HeaderSection";
import DetailsListsReserve from "@/components/ReserveHouses/DetailsLists";
import CommentReserve from "@/components/ReserveHouses/Comments";
const ReserveHouse = () => {
  return (
    <>
      <HeaderSectionReserve />

      <div className="flex flex-col justify-center items-start lg:flex-row gap-8 my-16 px-10 md:px-20">
        {/* ستون راست */}
        <div className="w-full lg:w-1/2 space-y-6">
          <DetailsListsReserve />
        </div>

        {/* ستون چپ */}
        <div className="w-full lg:w-1/2 space-y-6">
          <CommentReserve />
        </div>
      </div>
    </>
  );
};

export default ReserveHouse;
