"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ScrollShadow,
} from "@heroui/react";
import { MdClose } from "react-icons/md";
import Image from "next/image";

interface CompareModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  housesData: any[];
  housesLoading: boolean;
  ids: string[];
}

const CompareModal = ({
  isOpen,
  onOpenChange,
  housesData,
  housesLoading,
  ids,
}: CompareModalProps) => {
  const router = useRouter();

  console.log("ids", ids);
  console.log("housesData", housesData);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      className="max-h-[90vh] overflow-y-auto"
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center gap-1 text-center">
              انتخاب کارت برای مقایسه
              <Button
                size="sm"
                color="danger"
                variant="flat"
                onPress={onClose}
                className="rounded-xl"
              >
                <MdClose size={26} />
              </Button>
            </ModalHeader>
            <ModalBody>
              {housesLoading ? (
                <div className="text-center py-8 text-gray-500">
                  در حال دریافت لیست...
                </div>
              ) : (
                <ScrollShadow className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {(housesData || []).map((house) => (
                    <div
                      key={house.id}
                      onClick={() => {
                        if (!ids.includes(String(house.id))) {
                          const newIds = [...ids, house.id];
                          router.replace(`?id=${newIds.join(",")}`, {
                            scroll: false,
                          });
                        }
                        onClose();
                      }}
                      className="rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition bg-gray-50 cursor-pointer hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <Image
                        src={house?.photos?.[0]}
                        alt={house?.title}
                        unoptimized
                        className="object-cover rounded-lg mb-2 "
                        width={250}
                        height={96}
                      />
                      <div className="font-bold text-center mb-1 text-gray-800 dark:text-gray-200">
                        {house?.title}
                      </div>
                      <div className="text-sm mb-1 mt-3 text-gray-800 dark:text-gray-200">
                        {house?.address}
                      </div>
                      <div className="flex flex-wrap justify-center  gap-2 text-xs text-gray-600 mb-1">
                        <span className="dark:text-gray-200">
                          🛏 {house?.rooms} خواب
                        </span>
                        <span className="dark:text-gray-200">
                          🛁 {house?.bathrooms} حمام
                        </span>
                        <span className="dark:text-gray-200">
                          🚗 {house?.parking} پارکینگ
                        </span>
                        <span className="dark:text-gray-200">
                          ⭐ {house?.rate} امتیاز
                        </span>
                      </div>
                      <div className="text-red-500 dark:text-red-400 font-bold mb-1 text-center">
                        {Number(house.price).toLocaleString()} تومان
                      </div>
                    </div>
                  ))}
                </ScrollShadow>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CompareModal;
