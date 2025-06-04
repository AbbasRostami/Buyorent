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

  console.log(data);

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
            چرا هتل همایون رو انتخاب کنیم؟
          </MotionH2>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
            className="text-gray-700 dark:text-amber-50 leading-7 text-medium font-medium text-justify"
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه.
          </MotionP>

          <MapSingleReserve data={data} />

          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.1 }}
            className="text-gray-700 dark:text-amber-50 leading-7 text-medium font-medium text-justify"
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت.
          </MotionP>

          {/* نظرات کاربران */}
          <CommentSingleHouses houseId={id} />
        </div>
      </div>
    </>
  );
};

export default SingleHouses;
