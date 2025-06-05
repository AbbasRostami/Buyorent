"use client";
import React from "react";
import { useDisclosure } from "@heroui/react";
import CompareModal from "./CompareModal";
import CompareTable from "./CompareTable";
import { HouseSingleHousesProps } from "@/types/DetailsTypes";

interface ClientWrapperProps {
  selectedHouses: HouseSingleHousesProps[];
  ids: string[];
  housesData: HouseSingleHousesProps[];
}

const ClientWrapper = ({
  selectedHouses,
  ids,
  housesData,
}: ClientWrapperProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <CompareModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        housesData={housesData}
        housesLoading={false}
        ids={ids}
      />
      <CompareTable
        selectedHouses={selectedHouses}
        ids={ids}
        onOpenModal={onOpen}
      />
    </>
  );
};

export default ClientWrapper;
