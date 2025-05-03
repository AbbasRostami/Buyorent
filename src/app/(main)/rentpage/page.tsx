"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Slider,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import image4 from "./../../../assets/image4.png";
import { RiMenuSearchLine } from "react-icons/ri";
import {
  MdOutlineBedroomParent,
  MdOutlineBathroom,
  MdCarRepair,
} from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

const RentPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const properties = [
    {
      id: 1,
      title: "آپارتمان لوکس زعفرانیه",
      location: "تهران · زعفرانیه",
      price: "۱۵,۰۰۰,۰۰۰",
      oldPrice: "۱۶,۵۰۰,۰۰۰",
      discount: "۱۵٪",
      imageUrl: image4,
    },
    {
      id: 2,
      title: "واحد مبله در شهرک غرب",
      location: "تهران · شهرک غرب",
      price: "۱۸,۵۰۰,۰۰۰",
      oldPrice: "۲۰,۰۰۰,۰۰۰",
      discount: "۸٪",
      imageUrl: image4,
    },
    {
      id: 3,
      title: "خانه ویلایی در لواسان",
      location: "لواسان · مرکز شهر",
      price: "۲۵,۰۰۰,۰۰۰",
      oldPrice: "۲۸,۰۰۰,۰۰۰",
      discount: "۱۰٪",
      imageUrl: image4,
    },
    {
      id: 4,
      title: "آپارتمان نوساز در سعادت‌آباد",
      location: "تهران · سعادت‌آباد",
      price: "۱۲,۰۰۰,۰۰۰",
      oldPrice: "۱۳,۰۰۰,۰۰۰",
      discount: "۷٪",
      imageUrl: image4,
    },
    {
      id: 5,
      title: "سوئیت دانشجویی در انقلاب",
      location: "تهران · میدان انقلاب",
      price: "۸,۰۰۰,۰۰۰",
      oldPrice: "۸,۵۰۰,۰۰۰",
      discount: "۶٪",
      imageUrl: image4,
    },
    {
      id: 6,
      title: "آپارتمان اقتصادی در افسریه",
      location: "تهران · افسریه",
      price: "۶,۵۰۰,۰۰۰",
      oldPrice: "۷,۵۰۰,۰۰۰",
      discount: "۱۳٪",
      imageUrl: image4,
    },
    {
      id: 7,
      title: "خانه دوبلکس در نیاوران",
      location: "تهران · نیاوران",
      price: "۳۰,۰۰۰,۰۰۰",
      oldPrice: "۳۳,۰۰۰,۰۰۰",
      discount: "۹٪",
      imageUrl: image4,
    },
    {
      id: 8,
      title: "آپارتمان بازسازی‌شده در پونک",
      location: "تهران · پونک",
      price: "۱۰,۰۰۰,۰۰۰",
      oldPrice: "۱۱,۰۰۰,۰۰۰",
      discount: "۹٪",
      imageUrl: image4,
    },
    {
      id: 9,
      title: "خانه حیاط‌دار در تجریش",
      location: "تهران · تجریش",
      price: "۱۶,۰۰۰,۰۰۰",
      oldPrice: "۱۸,۰۰۰,۰۰۰",
      discount: "۱۱٪",
      imageUrl: image4,
    },
    {
      id: 10,
      title: "آپارتمان در بلوار فردوس",
      location: "تهران · بلوار فردوس",
      price: "۹,۵۰۰,۰۰۰",
      oldPrice: "۱۰,۰۰۰,۰۰۰",
      discount: "۵٪",
      imageUrl: image4,
    },
    {
      id: 11,
      title: "واحد کوچک در جنت‌آباد",
      location: "تهران · جنت‌آباد",
      price: "۷,۰۰۰,۰۰۰",
      oldPrice: "۸,۰۰۰,۰۰۰",
      discount: "۱۲٪",
      imageUrl: image4,
    },
    {
      id: 12,
      title: "واحد نقلی در نارمک",
      location: "تهران · نارمک",
      price: "۶,۰۰۰,۰۰۰",
      oldPrice: "۶,۸۰۰,۰۰۰",
      discount: "۱۱٪",
      imageUrl: image4,
    },
  ];

  const [filter, setFilter] = useState("");

  const filteredData = () =>
    properties.filter(
      (item) =>
        item.title.toLowerCase().includes(filter.toLowerCase()) ||
        item.location.toLowerCase().includes(filter.toLowerCase())
    );

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
    <>
      <div className="mt-32 gap-2 flex flex-col sm:flex-row sm:justify-start justify-center items-center max-w-screen-xl mx-auto px-4 text-center sm:text-right">
        <p className="text-2xl sm:text-4xl font-bold">رهن و اجاره آپارتمان</p>
        <p className="bg-[#e89300] rounded-2xl px-4 py-2 w-fit h-fit text-white font-bold text-xl sm:text-3xl mt-2 sm:mt-0">
          رشت
        </p>
      </div>

      <div className="flex flex-col justify-center gap-6 xl:flex-row md:justify-start md:items-center max-w-screen-xl mx-auto mt-14 text-[#272727] rounded-2xl px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 w-full">
          <div className="relative w-full md:w-[320px] max-w-md">
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              <RiMenuSearchLine size={25} />
            </span>
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="جستجو کنید..."
              className="w-full p-3 pr-10 text-sm border dark:text-amber-100 dark:placeholder:text-amber-50 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            onPress={onOpen}
            className="w-full md:w-24 text-sm bg-[#e89300] text-white p-3 rounded-2xl transition"
          >
            فیلترها
          </Button>
          <Modal
            isOpen={isOpen}
            size={"5xl"}
            onOpenChange={onOpenChange}
            scrollBehavior="inside"
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
                    فیلتر پیشرفته
                  </ModalHeader>
                  <ModalBody className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          محل مورد نظر
                        </label>
                        <Select placeholder="انتخاب مقصد" items={destinations}>
                          {(item) => (
                            <SelectItem key={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          نوع ملک
                        </label>
                        <Select placeholder="نوع مرتب‌سازی" items={sortOptions}>
                          {(item) => (
                            <SelectItem key={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          نوع معامله
                        </label>
                        <Select
                          placeholder="انتخاب امکانات"
                          items={amenities}
                          selectionMode="multiple"
                        >
                          {(item) => (
                            <SelectItem key={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          نوع معامله
                        </label>
                        <Select placeholder="حداقل امتیاز" items={ratings}>
                          {(item) => (
                            <SelectItem key={item.value}>
                              {item.label}
                            </SelectItem>
                          )}
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          حداقل اجاره
                        </label>
                        <Input
                          placeholder="مبلغ را وارد کنید..."
                          type="number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          حداکثر اجاره
                        </label>
                        <Input
                          placeholder="مبلغ را وارد کنید..."
                          type="number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          حداقل اجاره
                        </label>
                        <Input
                          placeholder="مبلغ را وارد کنید..."
                          type="number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          حداکثر اجاره
                        </label>
                        <Input
                          placeholder="مبلغ را وارد کنید..."
                          type="number"
                        />
                      </div>
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
                      className="bg-[#e89300]"
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
        </div>

        <ul className="flex gap-3 md:gap-4 overflow-x-auto md:overflow-visible whitespace-nowrap md:px-0">
          {[
            "همه",
            "محبوب ترین",
            "ارزان ترین",
            "گران ترین",
            "عکس دار",
            "پارکینگ دار",
            "حیاط دار",
          ].map((item, index) => (
            <li
              key={index}
              className="flex-shrink-0 w-24 cursor-pointer dark:text-amber-50 hover:bg-[#e89300] text-center text-base border border-[#ccc] rounded-2xl py-2"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 border-t border-[#ccc] mt-6 pt-6 max-w-screen-xl mx-auto">
        {filteredData().map((property: any) => (


<div
  key={property.id}
  className="group bg-white dark:bg-slate-900 border border-[#e5e5e5] rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-3 sm:p-4 cursor-pointer overflow-hidden"
>
  <div className="relative overflow-hidden rounded-2xl">
    <Image
      className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
      src={property.imageUrl}
      alt={property.title}
      width={400}
      height={300}
      priority
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl" />
  </div>

  <div className="p-2 sm:p-4 space-y-3">
    <h3 className="text-xl font-bold text-gray-800 dark:text-amber-200 transition-colors duration-300 group-hover:text-amber-600 dark:group-hover:text-yellow-300">
      {property.title}
    </h3>

    <p className="text-sm flex items-center gap-1 text-gray-500 dark:text-gray-300 transition-all duration-300 group-hover:translate-x-1">
      <IoLocationOutline size={20} className="text-gray-400 dark:text-white" />
      {property.location}
    </p>

    <div className="flex flex-wrap gap-2 border-t border-gray-200 dark:border-slate-700 pt-3">
      <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 transition-all duration-300 hover:scale-105">
        <MdOutlineBedroomParent size={18} /> ۲ خواب
      </div>
      <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 transition-all duration-300 hover:scale-105">
        <MdOutlineBathroom size={18} /> ۲ حمام
      </div>
      <div className="flex items-center gap-1 py-1 px-3 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-amber-50 transition-all duration-300 hover:scale-105">
        <MdCarRepair size={18} /> پارکینگ
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-2 mt-4">
      <span className="text-sm sm:text-base font-semibold text-gray-400 line-through decoration-red-400">
        {property.price}
      </span>
      <span className="text-xs">تومان / </span>
      <span className="text-base sm:text-xl font-bold text-gray-900 dark:text-[#e2eaa0] transition-colors duration-300">
        {property.oldPrice} <span className="text-xs">تومان</span>
      </span>
      <div className="bg-gradient-to-r from-red-500 to-red-600 ml-auto text-xs sm:text-sm font-bold px-3 py-1 text-white rounded-full shadow-sm animate-pulse group-hover:animate-none transition-all duration-300">
        {property.discount}
      </div>
    </div>
  </div>
</div>





        ))}
      </div>

      <div dir="ltr" className="w-full flex justify-center items-center mb-10">
        <Pagination
          className="mt-7"
          color="warning"
          showControls
          initialPage={1}
          total={20}
        />
      </div>
    </>
  );
};

export default RentPage;
