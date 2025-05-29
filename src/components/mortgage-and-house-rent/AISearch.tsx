"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@heroui/react";
import { useState, ChangeEvent } from "react";
import { SiOpenai } from "react-icons/si";
import { PiOpenAiLogoBold } from "react-icons/pi";
import { findSmartPropertyMatch } from "@/services/propertyService";
import { HouseItemsInterface } from "@/types/property";

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertySelect: (data: { houseId: number; reason: string }) => void;
  properties: HouseItemsInterface[];
}

function SmartSearchModal({
  isOpen,
  onClose,
  onPropertySelect,
  properties,
}: SmartSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setIsLoading(true);
      const result = await findSmartPropertyMatch({
        userInput: searchQuery,
        budget: Number(budget),
        houses: properties,
      });
      onPropertySelect(result);
      onClose();
    } catch (error) {
      console.error("Error in smart search:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBudgetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setBudget(value);
    }
  };

  const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex items-center gap-1">
          <PiOpenAiLogoBold className="text-green-500" size={25} />
          جستجوی هوشمند با هوش مصنوعی
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div className="flex gap-1.5 items-center">
              <h3 className="text-amber-500 font-semibold text-lg">بودجه</h3>
              <span className="text-fade font-medium text-sm">( تومان )</span>
            </div>

            <Input
              type="text"
              value={budget}
              onChange={handleBudgetChange}
              placeholder="1,200,000"
              dir="ltr"
            />

            <div className="flex gap-1.5 items-center">
              <h3 className="text-amber-500 font-semibold text-lg">توضیحات</h3>
            </div>

            <textarea
              value={searchQuery}
              onChange={handleQueryChange}
              className="w-full h-[200px] rounded-2xl border p-4 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="مثلا: خانه / آپارتمان / چند خوابه / چند حمام / چند پارکینگ"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={handleSearch}
            disabled={isLoading}
            color="warning"
            variant="shadow"
            className="w-full group hover:scale-105 transition-all duration-300 rounded-2xl text-lg font-semibold cursor-pointer h-12 text-white dark:text-black flex justify-center items-center gap-2"
          >
            {isLoading ? "در حال جستجو..." : "جستجو"}
            <SiOpenai className="text-xl" />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

interface SmartSearchProps {
  onPropertySelect: (data: { houseId: number; reason: string }) => void;
  properties: HouseItemsInterface[];
}

export default function SmartSearch({
  onPropertySelect,
  properties,
}: SmartSearchProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onPress={() => setIsModalOpen(true)}
        color="success"
        variant="shadow"
        className="w-full group hover:scale-105 transition-all duration-300 rounded-2xl text-lg font-semibold cursor-pointer h-12 text-white flex justify-center items-center gap-2"
      >
        جستجوی هوشمند
        <SiOpenai className="text-xl" />
      </Button>

      <SmartSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPropertySelect={onPropertySelect}
        properties={properties}
      />
    </>
  );
}
