import React from "react";
import DetailsLists from "@/components/mortgage-details/DetailsLists";
import CommentSingleHouses from "@/components/mortgage-details/Comments/Comments";
import MapSingleReserve from "@/components/mortgage-details/Map";
import HeaderSectionSingle from "@/components/mortgage-details/HeaderSection";
import { useServerData } from "@/utils/hooks/useServerData";
import { HouseSingleHousesProps } from "@/types/DetailsTypes";
import { Metadata } from "next";
import { generateMortgageAndRentDetailMetadata } from "@/utils/metadata/mortgage-and-rent";
import {
  MotionButton,
  MotionH2,
  MotionP,
} from "@/utils/providers/MotionWrapper";

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

async function getHouseData(id: string) {
  return useServerData<HouseSingleHousesProps>(
    `/houses/${id}`,
    `house-${id}`,
    60
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await getHouseData(resolvedParams.id);
  return generateMortgageAndRentDetailMetadata(data);
}

const SingleHouses = async ({ params }: Props) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const data = await getHouseData(id);

  console.log("data", data);

  return (
    <>
      <HeaderSectionSingle data={data} />

      <div className="flex flex-col justify-center items-start lg:flex-row gap-8 my-20 px-10 md:px-20">
        {/* ستون راست */}
        <div className="w-full lg:w-1/2 space-y-6">
          <DetailsLists data={data} />
        </div>

        {/* ستون چپ */}
        <div className="w-full lg:w-1/2 space-y-6">
          <MotionButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="text-lg font-bold border border-color2 px-4 py-2 rounded-full text-color1"
          >
            درباره ملک
          </MotionButton>
          <MotionH2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
            className="text-2xl font-bold text-justify"
          >
            چرا {data?.title} رو انتخاب کنیم؟
          </MotionH2>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
            className="text-gray-700 dark:text-amber-50 leading-7 text-medium font-medium text-justify"
          >
            {data?.caption}
          </MotionP>

          <MapSingleReserve data={data} />

          {/* نظرات کاربران */}
          <CommentSingleHouses houseId={id} />
        </div>
      </div>
    </>
  );
};

export default SingleHouses;
