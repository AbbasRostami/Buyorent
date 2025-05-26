import { useFormikContext } from "formik";
import { useRef } from "react";
import { FaCamera, FaPlus } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

const MAX_IMAGES = 4;

export default function Step4Images() {
  const { values, setFieldValue } = useFormikContext<any>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArr = Array.from(files);
    const readers = fileArr.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target?.result as string);
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((images) => {
      setFieldValue(
        "images",
        [...(values.images || []), ...images].slice(0, MAX_IMAGES)
      );
    });
    e.target.value = "";
  };

  const handleRemoveImage = (idx: number) => {
    setFieldValue(
      "images",
      values.images.filter((_: any, i: number) => i !== idx)
    );
  };

  // حالت اولیه: هیچ عکسی انتخاب نشده
  if (!values.images || values.images.length === 0) {
    return (
      <div className=" rounded-xl p-6 mt-4 ">
        <div className="text-right mb-4">
          <span className="text-gray-700 dark:text-amber-50 text-2xl text-center flex items-center gap-2">
            <GrGallery className="text-amber-400" size={24} />
            تصویر ملک
          </span>
          <p className="text-amber-600 dark:text-amber-400 font-bold text-lg mt-1 text-center">
            یک تصویر بهتر از هزار کلمه.
          </p>
          <p className="text-gray-600  dark:text-amber-50 text-sm mt-1 text-center">
            با قرار دادن عکس شانس دیده شدن ملک‌تان را ۵ برابر کنید.
          </p>
        </div>
        <div className="flex gap-4 justify-center mt-10">
          {[...Array(MAX_IMAGES)].map((_, idx) => (
            <div
              key={idx}
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center"
            >
              <FaCamera className="text-gray-300 text-3xl" />
            </div>
          ))}
          <div
            className="w-32 h-32 border-2 border-dashed border-amber-400 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <FaPlus className="text-amber-500 text-2xl mb-1" />
            <span className="text-amber-500 font-bold">افزودن عکس</span>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleAddImage}
              disabled={false}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" rounded-xl p-6 mt-4">
      <div className="text-right mb-4">
        <span className="text-gray-700 text-2xl dark:text-amber-50 flex items-center gap-2">
          <GrGallery className="text-amber-400" size={24} />
          تصویر ملک
        </span>
        <p className="text-amber-600 dark:text-amber-400 font-bold text-center text-lg mt-1">
          یک تصویر بهتر از هزار کلمه.
        </p>
        <p className="text-gray-600 dark:text-amber-50 text-sm mt-1 text-center">
          با قرار دادن عکس شانس دیده شدن ملک‌تان را ۵ برابر کنید.
        </p>
      </div>
      <div className="flex gap-4 justify-center mt-6">
        {values.images.map((img: string, idx: number) => (
          <div
            key={idx}
            className={`w-32 h-32 border-2 rounded-xl flex items-center justify-center relative group overflow-hidden ${
              idx === 0 ? "border-amber-400" : "border-gray-300"
            }`}
          >
            <img
              src={img}
              alt="preview"
              className="object-cover w-full h-full"
            />
            <button
              type="button"
              className="absolute top-1 left-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100"
              onClick={() => handleRemoveImage(idx)}
              title="حذف عکس"
            >
              ×
            </button>
            {idx === 0 && (
              <span className="absolute bottom-1 left-1 bg-amber-400 text-white text-xs px-2 py-1 rounded">
                تصویر اصلی
              </span>
            )}
          </div>
        ))}
        {values.images.length < MAX_IMAGES && (
          <div
            className="w-32 h-32 border-2 border-dashed border-amber-400 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <FaPlus className="text-amber-500 text-2xl mb-1" />
            <span className="text-lime-500 font-bold">افزودن عکس</span>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              className="hidden"
              onChange={handleAddImage}
              disabled={values.images.length >= MAX_IMAGES}
            />
          </div>
        )}
      </div>
    </div>
  );
}
