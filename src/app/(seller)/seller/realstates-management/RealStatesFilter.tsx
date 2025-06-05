import {
  Button,
  Modal,
  ModalContent,
  SelectItem,
  Select,
  Slider,
} from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { TbFilterCog, TbFilterPlus } from "react-icons/tb";
import { useState } from "react";

export default function RealStatesFilter({
  isOpen,
  onOpen,
  onOpenChange,
}: any) {
  const [value, setValue] = useState([100, 300]);
  console.log("====================================");
  console.log("value", value.join(" – "));
  console.log("====================================");
  return (
    <>
      <Button
        onPress={onOpen}
        variant="shadow"
        color="warning"
        className="w-1/3 rounded-lg"
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
                  <TbFilterCog className="dark:text-amber-200" size={30} />
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
                    aria-label="نوع ملک"
                    className="max-w-xs "
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
                  <label className="text-sm font-bold">وضعیت رزرو</label>
                  <Select
                    aria-label="وضعیت رزرو"
                    className="max-w-xs"
                    placeholder="وضعیت رزرو را انتخاب کنید..."
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
                <div className="flex flex-col gap-2 col-span-2 mt-4">
                  <label className="text-md font-bold flex items-center gap-2">
                    قیمت از
                    <span className="text-gray-500 dark:text-amber-100 font-normal text-lg">
                      {value[0]} تومان
                    </span>{" "}
                    تا
                    <span className="text-gray-500 dark:text-amber-100 font-normal text-lg">
                      {value[1]} تومان
                    </span>
                  </label>
                  <Slider
                    aria-label="قیمت"
                    className="w-full"
                    color="warning"
                    defaultValue={[100, 500]}
                    formatOptions={{ style: "currency", currency: "IRR" }}
                    maxValue={10000}
                    minValue={0}
                    value={value}
                    onChange={(value) => setValue(value as number[])}
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
