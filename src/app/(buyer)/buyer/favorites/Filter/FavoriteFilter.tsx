import {
  Button,
  Modal,
  ModalContent,
  SelectItem,
  Select,
  Input,
} from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { TbFilterHeart } from "react-icons/tb";

export default function FavoriteFilter({ isOpen, onOpen, onOpenChange }: any) {
  return (
    <>
      <Button
        onPress={onOpen}
        variant="shadow"
        color="warning"
        className="w-1/3"
      >
        فیلتر ها
      </Button>
      <Modal
        hideCloseButton
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <div className="bg-[#F9F9F9] rounded-2xl p-6 dark:bg-gray-800">
              <div className="flex items-center justify-between border-b border-dashed border-amber-500 pb-4 mb-4">
                <h2 className="text-2xl font-bold text-right flex items-center gap-2">
                  <TbFilterHeart className="dark:text-amber-200" size={30} />
                  فیلتر ها
                </h2>
                <button
                  className="flex items-center gap-2 border border-red-400 text-red-500 rounded-full px-6 py-2 text-lg font-bold hover:bg-red-50 dark:hover:bg-red-400 dark:text-white transition"
                  onClick={onClose}
                >
                  بستن <IoMdClose size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-7">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">نوع ملک</label>
                  <Select
                    className="max-w-xs"
                    placeholder="نوع ملک را انتخاب کنید..."
                  >
                    {[
                      { key: "hotel", label: "هتل" },
                      { key: "apartment", label: "آپارتمان" },
                      { key: "villa", label: "ویلا" },
                    ].map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">
                    {" "}
                    یا نوع همه هتل ها
                  </label>
                  <Select
                    className="max-w-xs"
                    placeholder="مقصد را انتخاب کنید..."
                  >
                    {[
                      { key: "tehran", label: "تهران" },
                      { key: "mashhad", label: "مشهد" },
                      { key: "shiraz", label: "شیراز" },
                    ].map((item) => (
                      <SelectItem key={item.key}>{item.label}</SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">حداقل قیمت</label>
                  <Input
                    placeholder="0.00"
                    className="block w-full"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          تومان
                        </span>
                      </div>
                    }
                    type="number"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold">حداقل قیمت</label>
                  <Input
                    labelPlacement="outside"
                    placeholder="0.00"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">
                          تومان
                        </span>
                      </div>
                    }
                    type="number"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <Button variant="shadow" color="warning" className="max-w-xs">
                  اعمال فیلتر
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
