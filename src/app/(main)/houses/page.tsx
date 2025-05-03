"use client";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollShadow,
  Select,
  SelectItem,
  Slider,
  useDisclosure,
} from "@heroui/react";
import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineNightsStay } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import dynamic from "next/dynamic";
import { FiFilter } from "react-icons/fi";
const Map = dynamic(() => import("./Map"), { ssr: false });
const data = [
  {
    id: 1,
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
    title: "ویلای مدرن شمال تهران",
    subtitle: "۶ شب",
    price: "۱۵٬۰۰۰٬۰۰۰",
    oldPrice: "۲۵٬۰۰۰٬۰۰۰",
    discountPercent: "۴۰",
    location: "تهران",
    location_coords: { lat: 35.6892, lng: 51.389 },
    details: {
      rooms: 4,
      capacity: 8,
      amenities: ["استخر", "جکوزی", "پارکینگ"],
      rating: 4.8,
    },
  },
  {
    id: 2,
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
    title: "سوئیت لوکس مشهد",
    subtitle: "۷ شب",
    price: "۱۲٬۰۰۰٬۰۰۰",
    oldPrice: "۲۰٬۰۰۰٬۰۰۰",
    discountPercent: "۴۰",
    location: "مشهد",
    location_coords: { lat: 36.2605, lng: 59.6168 },
    details: {
      rooms: 3,
      capacity: 6,
      amenities: ["نزدیک به حرم", "تراس"],
      rating: 4.9,
    },
  },
  {
    id: 3,
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
    title: "خانه سنتی اصفهان",
    subtitle: "۵ شب",
    price: "۹٬۰۰۰٬۰۰۰",
    oldPrice: "۱۵٬۰۰۰٬۰۰۰",
    discountPercent: "۴۰",
    location: "اصفهان",
    location_coords: { lat: 32.6539, lng: 51.666 },
    details: {
      rooms: 5,
      capacity: 10,
      amenities: ["حیاط مرکزی", "سونا"],
      rating: 4.7,
    },
  },
  {
    id: 4,
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
    title: "ویلای استخردار شیراز",
    subtitle: "۸ شب",
    price: "۱۸٬۰۰۰٬۰۰۰",
    oldPrice: "۳۰٬۰۰۰٬۰۰۰",
    discountPercent: "۴۰",
    location: "شیراز",
    location_coords: { lat: 29.5916, lng: 52.5836 },
    details: {
      rooms: 6,
      capacity: 12,
      amenities: ["باربیکیو", "سالن ورزش"],
      rating: 4.85,
    },
  },
  {
    id: 5,
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
    title: "آپارتمان مدرن شیراز",
    subtitle: "۸ شب",
    price: "۱۸٬۰۰۰٬۰۰۰",
    oldPrice: "۳۰٬۰۰۰٬۰۰۰",
    discountPercent: "۴۰",
    location: "شیراز",
    location_coords: { lat: 29.6153, lng: 52.5385 },
    details: {
      rooms: 3,
      capacity: 6,
      amenities: ["آسانسور", "نگهبان"],
      rating: 4.6,
    },
  },
  {
    id: 6,
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
    title: "کلبه جنگلی شیراز",
    subtitle: "۸ شب",
    price: "۱۸٬۰۰۰٬۰۰۰",
    oldPrice: "۳۰٬۰۰۰٬۰۰۰",
    discountPercent: "۴۰",
    location: "شیراز",
    location_coords: { lat: 29.7323, lng: 52.6281 },
    details: {
      rooms: 2,
      capacity: 4,
      amenities: ["شومینه", "منطقه جنگلی"],
      rating: 4.95,
    },
  },
  {
    id: 7,
    image: "https://4kwallpapers.com/images/walls/thumbs_3t/21958.jpg",
    title: "پنت هاوس لوکس شیراز",
    subtitle: "۸ شب",
    price: "۱۸٬۰۰۰٬۰۰۰",
    oldPrice: "۳۰٬۰۰۰٬۰۰۰",
    discountPercent: "۴۰",
    location: "شیراز",
    location_coords: { lat: 29.628, lng: 52.5165 },
    details: {
      rooms: 4,
      capacity: 8,
      amenities: ["رووف گاردن", "جکوزی"],
      rating: 4.9,
    },
  },
];
export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [priceRange, setPriceRange] = useState([1500000, 5500000]);

  const destinations = [
    { label: "تهران", value: "tehran" },
    { label: "شیراز", value: "shiraz" },
    { label: "اصفهان", value: "isfahan" },
  ];

  const sortOptions = [
    { label: "بیشترین امتیاز", value: "rating" },
    { label: "کمترین قیمت", value: "priceLow" },
    { label: "بیشترین قیمت", value: "priceHigh" },
  ];

  const amenities = [
    { label: "استخر", value: "pool" },
    { label: "صبحانه رایگان", value: "breakfast" },
    { label: "پارکینگ", value: "parking" },
  ];

  const ratings = [
    { label: "۴.۵+", value: "4.5" },
    { label: "۴.۰+", value: "4.0" },
    { label: "۳.۵+", value: "3.5" },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:h-screen min-h-screen pt-20 dark:bg-[#0a192f]">
      <div className="bg-white p-6 flex flex-col overflow-hidden dark:bg-[#0a192f]">
        <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
          <Button
            onPress={onOpen}
            className="text-xs cursor-pointer bg-[#586CFF] text-white p-4 rounded-lg transition"
          >
            فیلترها
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="opaque"
            classNames={{
              backdrop:
                "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
            }}
          >
            <ModalContent className="z-[99999]">
              {(onClose) => (
                <>
                  <ModalHeader className="text-lg font-semibold">
                    فیلتر پیشرفته هتل‌ها
                  </ModalHeader>
                  <ModalBody className="space-y-4">
                    {/* مقصد یا هتل */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        مقصد یا هتل شما
                      </label>
                      <Select placeholder="انتخاب مقصد" items={destinations}>
                        {(item) => (
                          <SelectItem key={item.value}>{item.label}</SelectItem>
                        )}
                      </Select>
                    </div>

                    {/* مرتب‌سازی */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        مرتب‌سازی بر اساس
                      </label>
                      <Select
                        placeholder="انتخاب نوع مرتب‌سازی"
                        items={sortOptions}
                      >
                        {(item) => (
                          <SelectItem key={item.value}>{item.label}</SelectItem>
                        )}
                      </Select>
                    </div>

                    {/* قیمت */}
                    <div>
                      <div className="flex flex-col gap-1 text-sm font-medium mb-2">
                        <p>
                          قیمت از:{" "}
                          <span className="text-color1">
                            {priceRange[0].toLocaleString()} تومان
                          </span>
                        </p>
                        <p>
                          قیمت تا:{" "}
                          <span className="text-color1">
                            {priceRange[1].toLocaleString()} تومان
                          </span>
                        </p>
                      </div>

                      <Slider
                        label="بازه قیمت (تومان)"
                        className="max-w-full"
                        color="warning"
                        value={priceRange}
                        onChange={(val) => setPriceRange(val as number[])}
                        minValue={1000000}
                        maxValue={10000000}
                        step={500000}
                        formatOptions={{
                          style: "currency",
                          currency: "IRR",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        getValue={(val) => `${val.toLocaleString()} تومان`}
                      />
                    </div>
                    {/* امکانات هتل */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        امکانات هتل
                      </label>
                      <Select
                        placeholder="انتخاب امکانات"
                        items={amenities}
                        selectionMode="multiple"
                      >
                        {(item) => (
                          <SelectItem key={item.value}>{item.label}</SelectItem>
                        )}
                      </Select>
                    </div>

                    {/* امتیاز هتل */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        امتیاز هتل
                      </label>
                      <Select placeholder="حداقل امتیاز" items={ratings}>
                        {(item) => (
                          <SelectItem key={item.value}>{item.label}</SelectItem>
                        )}
                      </Select>
                    </div>
                  </ModalBody>

                  <ModalFooter className="mt-4">
                    <Button
                      color="danger"
                      variant="light"
                      onPress={onClose}
                      className="ml-2"
                    >
                      انصراف
                    </Button>
                    <Button
                      className="bg-color1"
                      onPress={onClose}
                      startContent={<FiFilter className="text-lg" />}
                    >
                      اعمال فیلترها
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <div className="relative flex-1 min-w-[180px]">
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <RiMenuSearchLine size={25} />
            </span>
            <input
              type="text"
              placeholder="جستجو کنید..."
              className="w-full p-3 pr-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollShadow
          size={50}
          offset={10}
          hideScrollBar
          className="h-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="border border-[#EAEAEA] rounded-2xl shadow-sm hover:shadow-md transition p-4 flex flex-col min-h-[300px] overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold truncate">{item.title}</h2>

              <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mt-2 flex-wrap">
                <div className="flex items-center gap-1">
                  <IoLocationOutline
                    className="dark:text-amber-100"
                    size={18}
                  />
                  <span className="truncate dark:text-amber-50">
                    {item.location}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MdOutlineNightsStay
                    className="dark:text-amber-100"
                    size={18}
                  />
                  <span className="dark:text-amber-50">{item.subtitle}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-baseline gap-2 text-sm font-bold flex-wrap">
                  <span className="line-through decoration-red-500 text-gray-400">
                    {item.oldPrice} تومان
                  </span>
                  <span className="text-black dark:text-amber-100">
                    / {item.price}
                    <span className="text-[#595959] text-xs dark:text-amber-50 mr-1">
                      تومان
                    </span>
                  </span>
                </div>
                <button className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-md">
                  ٪{item.discountPercent} تخفیف
                </button>
              </div>
            </div>
          ))}
        </ScrollShadow>
      </div>

      {/* بخش چپ */}
      <div className=" z-0 dark:bg-[#0a192f] p-4 lg:p-0  md:h-[calc(100vh-5rem)] min-h-[400px]">
        <Map properties={filteredData.filter((d) => d.location_coords)} />
      </div>
    </div>
  );
}
