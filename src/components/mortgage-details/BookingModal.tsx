"use client";

import React, { useState, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CreateBooking } from "@/services/Bookings/postBooking";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdNotificationAdd } from "react-icons/md";
import { GiPriceTag } from "react-icons/gi";
import PersianDatePicker from "../shared/PersianDatePicker";
import { travelerSchema } from "@/utils/validation/ReserveBooking";
import { BookingModalProps } from "@/types/Buyer/booking-management/page";

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  houseId,
  reservedDates,
  travelerCount,
  totalPrice,
}) => {
  const formikRef = useRef<any>(null);
  const { mutate: createBooking, isPending } = CreateBooking(onClose);
  const [currentTravelerCount, setCurrentTravelerCount] =
    useState(travelerCount);

  const calculateModalPrice = (count: number) => {
    const basePrice = totalPrice / travelerCount;
    return basePrice * count;
  };

  const [modalTotalPrice, setModalTotalPrice] = useState(
    calculateModalPrice(travelerCount)
  );

  const initialValues = {
    sharedEmail: "",
    sharedMobile: "",
    travelers: Array.from({ length: travelerCount }, () => ({
      firstName: "",
      lastName: "",
      gender: "male" as const,
      birthDate: "",
      nationalId: "",
    })),
  };

  const addTraveler = () => {
    if (currentTravelerCount < 10) {
      const newCount = currentTravelerCount + 1;
      setCurrentTravelerCount(newCount);
      setModalTotalPrice(calculateModalPrice(newCount));
      if (formikRef.current) {
        const currentValues = formikRef.current.values;
        const newTraveler = {
          firstName: "",
          lastName: "",
          gender: "male" as const,
          birthDate: "",
          nationalId: "",
        };
        formikRef.current.setFieldValue("travelers", [
          ...currentValues.travelers,
          newTraveler,
        ]);
      }
    }
  };

  const removeTraveler = () => {
    if (currentTravelerCount > 1) {
      const newCount = currentTravelerCount - 1;
      setCurrentTravelerCount(newCount);
      setModalTotalPrice(calculateModalPrice(newCount));
      if (formikRef.current) {
        const currentValues = formikRef.current.values;
        const updatedTravelers = currentValues.travelers.slice(0, -1);
        formikRef.current.setFieldValue("travelers", updatedTravelers);
      }
    }
  };

  const handleSubmit = async (values: any) => {
    const bookingData = {
      houseId,
      reservedDates,
      traveler_details: values.travelers,
      sharedEmail: values.sharedEmail,
      sharedMobile: values.sharedMobile,
    };

    createBooking(bookingData);
  };

  const handleConfirmBooking = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-1">
          <BiSolidUserDetail
            className="text-amber-700 dark:text-amber-500"
            size={28}
          />
          <h3 className="text-xl font-bold">اطلاعات تکمیلی رزرو</h3>
        </ModalHeader>
        <ModalBody>
          <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            validationSchema={travelerSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">
                    اطلاعات مسافران
                  </h4>
                  <div className="space-y-4">
                    {values.travelers.map((_, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-amber-400 rounded-lg p-4"
                      >
                        <h5 className="font-medium mb-3">مسافر {index + 1}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              نام
                            </label>
                            <Field
                              name={`travelers.${index}.firstName`}
                              placeholder="نام"
                              className="w-full form-input"
                            />
                            <ErrorMessage
                              name={`travelers.${index}.firstName`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              نام خانوادگی
                            </label>
                            <Field
                              name={`travelers.${index}.lastName`}
                              placeholder="نام خانوادگی"
                              className="w-full form-input"
                            />
                            <ErrorMessage
                              name={`travelers.${index}.lastName`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div className="w-full ">
                            <label className="block text-sm font-medium mb-2">
                              جنسیت
                            </label>
                            <Select
                              id={`travelers.${index}.gender`}
                              required
                              aria-label="جنسیت"
                              selectedKeys={[values.travelers[index].gender]}
                              onSelectionChange={(keys: any) => {
                                const gender = Array.from(keys)[0] as string;
                                setFieldValue(
                                  `travelers.${index}.gender`,
                                  gender
                                );
                              }}
                              variant="flat"
                              radius="sm"
                              size="md"
                              className="w-full mt-4"
                              placeholder="انتخاب جنسیت"
                              classNames={{
                                trigger:
                                  "w-full px-4 h-10 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400",
                              }}
                            >
                              <SelectItem key="male">مرد</SelectItem>
                              <SelectItem key="female">زن</SelectItem>
                            </Select>
                            <ErrorMessage
                              name={`travelers.${index}.gender`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div className="w-full flex flex-col">
                            <label className="block text-sm font-medium mb-2">
                              تاریخ تولد
                            </label>
                            <PersianDatePicker
                              id={`travelers.${index}.birthDate`}
                              required
                              name={`travelers.${index}.birthDate`}
                              disablePortal={true}
                              onChange={(date) => {
                                setFieldValue(
                                  `travelers.${index}.birthDate`,
                                  date
                                );
                              }}
                            />
                            <ErrorMessage
                              name={`travelers.${index}.birthDate`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">
                              کد ملی
                            </label>
                            <Field
                              name={`travelers.${index}.nationalId`}
                              placeholder="کد ملی"
                              className="w-full form-input"
                            />
                            <ErrorMessage
                              name={`travelers.${index}.nationalId`}
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col  gap-4">
                  <span className=" font-medium flex flex-col md:flex-row  col-span-2 items-center gap-2">
                    <span className="text-sm font-bold flex items-center gap-1">
                      <MdNotificationAdd className="text-amber-500" size={20} />
                      اطلاع رسانی سفر
                    </span>
                    <span className="text-gray-500 text-justify dark:text-gray-300 text-xs">
                      ( اطلاعات بلیط و اطلاع رسانی بعدی به این آدرس ارسال می
                      شود. )
                    </span>
                  </span>

                  <div className="flex flex-col md:flex-row justify-evenly items-center gap-6">
                    <div className="">
                      <label className="block text-sm font-medium mb-2">
                        ایمیل (اختیاری)
                      </label>
                      <Field
                        name="sharedEmail"
                        placeholder="example@email.com"
                        className="w-full form-input"
                      />
                      <ErrorMessage
                        name="sharedEmail"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="">
                      <label className="block text-sm font-medium mb-2">
                        شماره موبایل (اختیاری)
                      </label>
                      <Field
                        name="sharedMobile"
                        placeholder="09123456789"
                        className="w-full form-input"
                      />
                      <ErrorMessage
                        name="sharedMobile"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-6 justify-between">
            <span className="text-md font-bold text-gray-600 dark:text-gray-300">
              تعداد مسافران: {currentTravelerCount}
            </span>
            <div className="flex  items-center gap-2">
              <Button
                color="danger"
                variant="bordered"
                size="sm"
                onPress={removeTraveler}
                isDisabled={currentTravelerCount <= 1}
                className="flex items-center gap-2"
              >
                <span className="text-lg">-</span>
                حذف مسافر
              </Button>
              <Button
                color="success"
                variant="bordered"
                size="sm"
                onPress={addTraveler}
                isDisabled={currentTravelerCount >= 10}
                className="flex items-center gap-2"
              >
                <span className="text-lg">+</span>
                افزودن مسافر
              </Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="flex items-center gap-2 text-lg font-bold">
            <GiPriceTag
              className="text-amber-700 dark:text-amber-400"
              size={28}
            />
            <span className="text-lg font-bold flex items-center gap-1">
              مجموع قیمت:
              <span className="text-red-600 dark:text-red-400">
                {modalTotalPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-200">
                تومان
              </span>
            </span>
          </p>
          <div className="w-full md:w-auto flex flex-col md:flex-row  items-center gap-2 mt-2">
            <Button
              className="w-full md:w-auto"
              color="danger"
              variant="flat"
              onPress={onClose}
            >
              انصراف
            </Button>
            <Button
              color="warning"
              variant="shadow"
              onPress={handleConfirmBooking}
              isLoading={isPending}
              className="w-full md:w-auto"
            >
              تایید رزرو
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
