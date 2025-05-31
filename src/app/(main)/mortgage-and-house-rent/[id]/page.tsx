import React from "react";
import DetailsLists from "@/components/houses-reserve/DetailsLists";
import CommentSingleHouses from "@/components/houses-reserve/Comments/Comments";
import MapSingleReserve from "@/components/houses-reserve/Map";
import HeaderSectionSingle from "@/components/houses-reserve/HeaderSection";
import { useServerData } from "@/utils/hooks/useServerData";
import { HouseSingleHousesProps } from "@/types/DetailsTypes";
import { Metadata } from "next";
import { generateMortgageAndRentDetailMetadata } from "@/utils/metadata/mortgage-and-rent";

export const revalidate = 60;

type Props = {
  params: { id: string };
};

async function getHouseData(id: string) {
  return useServerData<HouseSingleHousesProps>(
    `/houses/${id}`,
    `house-${id}`,
    60
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  
  const data = await getHouseData(params.id);
  return generateMortgageAndRentDetailMetadata(data);
}

const SingleHouses = async ({ params }: Props) => {
  const { id } = params;
  const data = await getHouseData(id);

  console.log(data);

  return (
    <>
      <HeaderSectionSingle data={data} />

      <div className="flex flex-col justify-center items-start lg:flex-row gap-8 my-16 px-10 md:px-20">
        {/* ستون راست */}
        <div className="w-full lg:w-1/2 space-y-6">
          <DetailsLists data={data} />
        </div>

        {/* ستون چپ */}
        <div className="w-full lg:w-1/2 space-y-6">
          <button className="text-lg font-bold border border-color2 px-4 py-2 rounded-full text-color1">
            درباره ملک
          </button>
          <h2 className="text-2xl font-bold text-justify">
            چرا هتل همایون رو انتخاب کنیم؟
          </h2>
          <p className="text-gray-700 dark:text-amber-50 leading-7 text-medium font-medium text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید
            سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
            چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است،
            و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
            آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
            شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و
            فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت
            که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان
            رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
            پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
          </p>

          <MapSingleReserve data={data} />

          <p className="text-gray-700 dark:text-amber-50 leading-7 text-medium font-medium text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت.
          </p>

          {/* نظرات کاربران */}
          <CommentSingleHouses houseId={id} />
        </div>
      </div>
    </>
  );
};

export default SingleHouses;
