import { Button, Modal, ModalContent, SelectItem, Select } from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { TbFilterPlus } from "react-icons/tb";
import PersianDatePicker from "@/components/common/PersianDatePicker";

export default function BookingSellerFilter({
  isOpenFilter,
  onOpenFilter,
  onOpenChangeFilter,
}: any) {
  return (
    <>
      <Button
        onPress={onOpenFilter}
        variant="shadow"
        color="warning"
        className="w-1/3 rounded-lg"
      >
        فیلتر ها
      </Button>
      <Modal
        hideCloseButton
        size="xl"
        isOpen={isOpenFilter}
        onOpenChange={onOpenChangeFilter}
      >
        <ModalContent>
          {(onClose) => (
            <div className="bg-[#F9F9F9] rounded-2xl p-6 dark:bg-gray-800">
              <div className="flex items-center justify-between border-b border-dashed border-amber-500 pb-4 mb-4">
                <h2 className="text-2xl font-bold text-right flex items-center gap-2">
                  <TbFilterPlus className="dark:text-amber-200" size={30} />
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
                <div className="flex flex-col gap-2  col-span-2 md:col-span-1">
                  <label className="text-sm font-bold">تاریخ رفت</label>
                  <PersianDatePicker
                    onChange={(date) => {
                      console.log("تاریخ انتخابی:", date?.format("YYYY/MM/DD"));
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                  <label className="text-sm font-bold">تاریخ بازگشت</label>
                  <PersianDatePicker
                    onChange={(date) => {
                      console.log("تاریخ انتخابی:", date?.format("YYYY/MM/DD"));
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2 col-span-2 ">
                  <label className="text-sm font-bold">وضعیت رزرو</label>
                  <Select
                    aria-label="وضعیت رزرو"
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
