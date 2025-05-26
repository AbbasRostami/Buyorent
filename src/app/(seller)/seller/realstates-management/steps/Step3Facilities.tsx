import { Chip, Select, SelectItem } from "@heroui/react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { IoClose } from "react-icons/io5";

const parkingTypes = [
  { value: "open", label: "روباز" },
  { value: "covered", label: "مسقف" },
  { value: "balcony", label: "بالکن دار" },
];

const animals = [
  { key: "مدرن", label: "مدرن" },
  { key: "آسانسوردار", label: "آسانسوردار" },
  { key: "آپارتمان", label: "آپارتمان" },
  { key: "لوکس", label: "لوکس" },
  { key: "بازسازی شده", label: "بازسازی شده" },
  { key: "نوساز", label: "نوساز" },
];

export default function Step3Facilities() {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className="rounded-xl p-6 mt-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">تعداد اتاق:</label>
          <Field name="roomCount" type="number" className="w-full form-input" />
          <ErrorMessage
            name="roomCount"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">تعداد حمام:</label>
          <Field name="bathCount" type="number" className="w-full form-input" />
          <ErrorMessage
            name="bathCount"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            تعداد پارکینگ:
          </label>
          <Field
            name="parkingCount"
            type="number"
            className="w-full form-input"
          />
          <ErrorMessage
            name="parkingCount"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">نوع پارکینگ:</label>
          <Field as="select" name="parkingType" className="w-full form-input">
            <option value="">انتخاب کنید</option>
            {parkingTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="parkingType"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">برچسب‌ها:</label>
        <div className="flex flex-wrap gap-2 mb-2">
          <Select
            aria-label="Tags"
            className="w-full form-input"
            placeholder="انتخاب کنید"
            selectionMode="multiple"
            selectedKeys={new Set(values.tags)}
            onSelectionChange={(keys) =>
              setFieldValue("tags", Array.from(keys))
            }
            renderValue={(items) => (
              <div className="flex gap-1 flex-wrap">
                {items.map((item) => (
                  <Chip
                    key={item.key}
                    variant="shadow"
                    color="warning"
                    endContent={
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newTags = new Set(values.tags);
                          newTags.delete(item.key);
                          setFieldValue("tags", newTags);
                        }}
                      >
                        <IoClose className="text-xs" />
                      </button>
                    }
                  >
                    {(item.data as { label: string })?.label ?? item.key}
                  </Chip>
                ))}
              </div>
            )}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
