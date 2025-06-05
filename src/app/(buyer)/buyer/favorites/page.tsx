import React from "react";
import image from "./../../../../assets/Avatar1.png";
import image2 from "./../../../../assets/Avatar2.png";
import image3 from "./../../../../assets/Avatar3.png";
import FavoriteTable from "./Table/FavoriteTable";
export interface BookingDataFavo {
  id: number;
  title: string;
  addres: string;
  price: number;
  image: string;
}
export default function FavoritePage() {
  const data: BookingDataFavo[] = [
    {
      id: 1,
      title: "هتل سراوان",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 150000000,
      image: image.src,
    },
    {
      id: 2,
      title: "شیراز پارک",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 150000000,
      image: image2.src,
    },
    {
      id: 3,
      title: "تراول پارک",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 160000000,
      image: image3.src,
    },
    {
      id: 4,
      title: "میدان جمهریه",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 180000000,
      image: image2.src,
    },
    {
      id: 5,
      title: "ماهی پارک",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 170000000,
      image: image3.src,
    },
    {
      id: 6,
      title: "کوه سراوان",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 170000000,
      image: image2.src,
    },
    {
      id: 7,
      title: "ساحل سراوان",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 100000,
      image: image.src,
    },
    {
      id: 8,
      title: "ماهی پارک",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 160000000,
      image: image2.src,
    },
    {
      id: 9,
      title: "ماهی پارک",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 190000000,
      image: image3.src,
    },
    {
      id: 10,
      title: "نسرین پارک",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 170000000,
      image: image2.src,
    },
    {
      id: 11,
      title: "ماهی پارک",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 170000000,
      image: image.src,
    },
    {
      id: 12,
      title: "ساحل سراوان",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 170000000,
      image: image3.src,
    },
    {
      id: 13,
      title: "ماهی بهشهر",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 186600000,
      image: image2.src,
    },
    {
      id: 14,
      title: "ماهی پارک",
      addres: " گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت...",
      price: 170000000,
      image: image.src,
    },
  ];

  return (
    <div>
      <FavoriteTable data={data || []} />
    </div>
  );
}
