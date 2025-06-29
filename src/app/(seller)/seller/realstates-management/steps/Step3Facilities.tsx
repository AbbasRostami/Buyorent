"use client";
import { CategorytypeProps } from "@/types/Landing/LandingType";
import { useGet } from "@/utils/hooks/useReactQueryHooks";
import { Chip, Select, SelectItem, Skeleton, Spinner } from "@heroui/react";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { IoClose } from "react-icons/io5";

const yardTypes = [
  { value: "حیاط دار بزرگ", label: "حیاط دار بزرگ" },
  { value: "حیاط دار کوچک", label: "حیاط دار کوچک" },
  { value: "بدون حیاط", label: "بدون حیاط" },
  { value: "بالکن دار", label: "بالکن دار" },
];

const availableTags = [
  { key: "مدرن", label: "مدرن" },
  { key: "آسانسوردار", label: "آسانسوردار" },
  { key: "آپارتمان", label: "آپارتمان" },
  { key: "لوکس", label: "لوکس" },
  { key: "بازسازی شده", label: "بازسازی شده" },
  { key: "نوساز", label: "نوساز" },
  { key: "قدیمی", label: "قدیمی" },
  { key: "ویلا", label: "ویلا" },
];

export default function Step3Facilities() {
  const { values, setFieldValue } = useFormikContext<any>();
  const { data: categories, isLoading } =
    useGet<CategorytypeProps>("/categories");
  if (isLoading)
    return (
      <div className="rounded-xl p-6 w-full h-full shadow-md border bg-white mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-10 rounded"
          />
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-10 rounded"
          />
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-10 rounded"
          />
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-10 rounded"
          />
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-10 rounded"
          />
          <Skeleton
            classNames={{
              base: "animate-pulse bg-gray-200 dark:bg-gray-700",
            }}
            className="h-10 rounded"
          />
        </div>
      </div>
    );
  if (categories?.data?.length === 0)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">هیچ دسته بندی یافت نشد</p>
      </div>
    );
  return (
    <div className="rounded-xl p-1 mt-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">تعداد اتاق:</label>
          <Field
            name="rooms"
            type="number"
            className="w-full form-input"
            placeholder="مثال: 20"
            min="0"
            max="30"
          />
          <ErrorMessage
            name="rooms"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">تعداد حمام:</label>
          <Field
            name="bathrooms"
            type="number"
            className="w-full form-input"
            placeholder="مثال: 3"
            min="0"
            max="30"
          />
          <ErrorMessage
            name="bathrooms"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            تعداد پارکینگ:
          </label>
          <Field
            name="parking"
            type="number"
            className="w-full form-input"
            placeholder="مثال: 3"
            min="0"
            max="30"
          />
          <ErrorMessage
            name="parking"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">نوع حیاط:</label>
          <Field as="select" name="yard_type" className="w-full form-input">
            <option value="">انتخاب کنید</option>
            {yardTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="yard_type"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">نوع ملک:</label>
          <Field
            as="select"
            name="categories.id"
            className="w-full form-input"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const selectedId = e.target.value;
              const selectedCategory = categories?.data?.find(
                (cat: any) => cat.id.toString() === selectedId
              );
              setFieldValue("categories.id", selectedId);
              setFieldValue("categories.name", selectedCategory?.name || "");
            }}
          >
            <option value="">انتخاب کنید</option>
            {categories?.data?.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="categories.id"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div className="">
          <label className="block mb-1 text-sm font-medium">برچسب‌ها:</label>
          <div className="flex flex-wrap">
            <Select
              aria-label="Tags"
              size="lg"
              radius="sm"
              variant="bordered"
              className="w-full mt-1 "
              placeholder="انتخاب کنید"
              selectionMode="multiple"
              selectedKeys={new Set(values.tags)}
              onSelectionChange={(keys) =>
                setFieldValue("tags", Array.from(keys))
              }
              renderValue={(items) => (
                <div className="flex gap-1 flex-wrap min-h-[32px] p-1">
                  {items.slice(0, 2).map((item) => (
                    <Chip
                      key={item.key}
                      variant="shadow"
                      color="warning"
                      className="text-xs md:text-sm my-0.5"
                      endContent={
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newTags = new Set(values.tags);
                            newTags.delete(item.key);
                            setFieldValue("tags", newTags);
                          }}
                          className="p-0.5"
                        >
                          <IoClose className="text-xs md:text-sm" />
                        </button>
                      }
                    >
                      {(item.data as { label: string })?.label ?? item.key}
                    </Chip>
                  ))}
                  {items.length > 2 && (
                    <Chip
                      variant="shadow"
                      color="warning"
                      className="text-xs md:text-sm my-0.5"
                    >
                      +{items.length - 2} مورد دیگر
                    </Chip>
                  )}
                </div>
              )}
            >
              {availableTags.map((tag) => (
                <SelectItem key={tag.key} className="text-xs md:text-sm">
                  {tag.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
