import { Field, ErrorMessage, useFormikContext } from "formik";

const estateTypes = [
  { value: "residential", label: "مسکونی" },
  { value: "commercial", label: "تجاری" },
];
const dealTypes = [
  { value: "sell", label: "فروش" },
  { value: "rent", label: "اجاره" },
];
const subTypes = {
  residential: [
    { value: "apartment", label: "آپارتمانی" },
    { value: "villa", label: "ویلایی" },
  ],
  commercial: [
    { value: "office", label: "اداری" },
    { value: "shop", label: "مغازه" },
  ],
};

export default function Step1BasicInfo() {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className=" rounded-xl p-2 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">نام ملک:</label>
          <Field name="title" className="form-input w-full" />
          <ErrorMessage
            name="title"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">ظرفیت (نفر):</label>
          <Field name="capacity" type="number" className="form-input w-full" />
          <ErrorMessage
            name="capacity"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">قیمت:</label>
          <div className="flex items-center gap-2">
            <Field name="price" type="number" className="form-input w-full" />
            <span className="text-gray-500">ریال</span>
          </div>
          <ErrorMessage
            name="price"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">نوع معامله:</label>
          <Field as="select" name="dealType" className="form-input w-full">
            <option value="">انتخاب کنید</option>
            {dealTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="dealType"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">نوع ملک:</label>
          <Field
            as="select"
            name="estateType"
            className="form-input w-full"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFieldValue("estateType", e.target.value)
            }
          >
            <option value="">انتخاب کنید</option>
            {estateTypes.map((item: { value: string; label: string }) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="estateType"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">زیرنوع ملک:</label>
          <Field as="select" name="subType" className="form-input w-full">
            <option value="">انتخاب کنید</option>
            {(subTypes[values.estateType as keyof typeof subTypes] || []).map(
              (item: { value: string; label: string }) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              )
            )}
          </Field>
          <ErrorMessage
            name="subType"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">توضیحات ملک:</label>
        <Field
          as="textarea"
          name="description"
          rows={3}
          className="form-input w-full"
        />
        <ErrorMessage
          name="description"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
    </div>
  );
}
