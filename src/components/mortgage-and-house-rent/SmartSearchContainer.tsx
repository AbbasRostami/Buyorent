"use client";

import { useState } from "react";
import SmartSearch from "./AISearch";
import PropertyDetailsModal from "./PropertyDetailsModal";
import { HouseItemsInterface } from "@/types/property";

interface SmartSearchContainerProps {
  properties: HouseItemsInterface[];
}

export default function SmartSearchContainer({
  properties,
}: SmartSearchContainerProps) {
  const [selectedProperty, setSelectedProperty] =
    useState<HouseItemsInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchReason, setSearchReason] = useState("");

  const handlePropertySelect = (data: { houseId: number; reason: string }) => {
    const property = properties.find(
      (prop) => prop.id === String(data.houseId)
    );
    if (property) {
      setSelectedProperty(property);
      setSearchReason(data.reason);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setSearchReason("");
  };

  return (
    <>
      <SmartSearch
        onPropertySelect={handlePropertySelect}
        properties={properties}
      />
      <PropertyDetailsModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        property={selectedProperty}
        reason={searchReason}
      />
    </>
  );
}
