import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onApplyFilters: (filters: any) => void;
}

const destinations = [
  { label: "تهران", value: "تهران" },
  { label: "شیراز", value: "شیراز" },
  { label: "اصفهان", value: "اصفهان" },
];

const propertyTypes = [
  { label: "همه", value: "همه" },
  { label: "ویلا", value: "ویلا" },
  { label: "آپارتمان", value: "آپارتمان" },
  { label: "روستایی", value: "روستایی" },
];

const transactionTypes = [
  { label: "اجاره", value: "rental" },
  { label: "رهن", value: "mortgage" },
  { label: "خرید", value: "direct_purchase" },
];

const sortOptions = [
  { label: "جدیدترین‌ها", value: "last_updated" },
  { label: "ارزان‌ترین‌ها", value: "price" },
  { label: "محبوب‌ترین‌ها", value: "rate" },
];

const FilterModal = ({
  isOpen,
  onOpenChange,
  onApplyFilters,
}: FilterModalProps) => {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    transactionType: "",
    minRent: "",
    maxRent: "",
    minMortgage: "",
    maxMortgage: "",
    sort: "",
    search: "",
  });

  return (
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
                  <Select
                    placeholder="انتخاب مقصد"
                    items={destinations}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  >
                    {(item) => (
                      <SelectItem key={item.value}>{item.label}</SelectItem>
                    )}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    نوع ملک
                  </label>
                  <Select
                    placeholder="نوع ملک"
                    items={propertyTypes}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        propertyType: e.target.value,
                      }))
                    }
                  >
                    {(item) => (
                      <SelectItem key={item.value}>{item.label}</SelectItem>
                    )}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    نوع معامله
                  </label>
                  <Select
                    placeholder="نوع معامله"
                    items={transactionTypes}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        transactionType: e.target.value,
                      }))
                    }
                  >
                    {(item) => (
                      <SelectItem key={item.value}>{item.label}</SelectItem>
                    )}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    مرتب‌ سازی
                  </label>
                  <Select
                    placeholder="مرتب‌سازی"
                    items={sortOptions}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sort: e.target.value,
                      }))
                    }
                  >
                    {(item) => (
                      <SelectItem key={item.value}>{item.label}</SelectItem>
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
                    type="number"
                    placeholder="مبلغ را وارد کنید..."
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minRent: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    حداکثر اجاره
                  </label>
                  <Input
                    type="number"
                    placeholder="مبلغ را وارد کنید..."
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxRent: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    حداقل رهن
                  </label>
                  <Input
                    type="number"
                    placeholder="مبلغ را وارد کنید..."
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        minMortgage: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    حداکثر رهن
                  </label>
                  <Input
                    type="number"
                    placeholder="مبلغ را وارد کنید..."
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        maxMortgage: e.target.value,
                      }))
                    }
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
                onPress={() => {
                  onApplyFilters(filters);
                  onClose();
                }}
                startContent={<FiFilter className="text-lg" />}
              >
                اعمال فیلترها
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
